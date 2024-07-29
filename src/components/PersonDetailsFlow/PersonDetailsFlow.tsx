import { useCallback, useLayoutEffect } from "react";
import { ReactFlow, Controls, Background, ReactFlowProvider, useReactFlow, useNodesState, useEdgesState, type Node, type Edge } from '@xyflow/react';
import { stratify, tree } from 'd3-hierarchy';
import { useAppSelector } from '../../store';
import '@xyflow/react/dist/style.css';
import styles from './PersonDetailsFlow.module.css';

const g = tree<Node>();

const getLayoutedElements = (nodes: Node[], edges: Edge[]) => {
    if (nodes.length === 0) return { nodes, edges };
    if (!document) return { nodes, edges };
  
    const object = document.querySelector(`[data-id="${nodes[0].id}"]`);

    if (!object) return { nodes, edges };

    const { width, height } = object.getBoundingClientRect();
    const hierarchy = stratify<Node>().id((node) => node.id).parentId((node) => edges.find((edge) => edge.target === node.id)?.source);
    const root = hierarchy(nodes);
    const layout = g.nodeSize([width * 2, height * 2])(root);
  
    return {
      nodes: layout
        .descendants()
        .map((node) => ({ ...node.data, position: { x: node.x, y: node.y } })),
      edges,
    };
};

function LayoutFlow() {
    const { personData, filmsData, starshipsData } = useAppSelector(state => state.person);

    const { fitView } = useReactFlow();
    const [nodes, setNodes] = useNodesState<Node>([]);
    const [edges, setEdges] = useEdgesState<Edge>([]);

    const onLayout = useCallback(
        (nodes: Node[], edges:Edge[]) => {
          const { nodes: layoutedNodes, edges: layoutedEdges } =
            getLayoutedElements(nodes, edges);
    
          setNodes([...layoutedNodes]);
          setEdges([...layoutedEdges]);
    
          window.requestAnimationFrame(() => {
            fitView();
          });
        },
        [nodes, edges],
    );

    useLayoutEffect(() => {
        if (!personData || !filmsData || !starshipsData) {
            return;
        }

        const newNodes: Node[] = [];
        const newEdges: Edge[] = [];

        const filteredFilmsData = filmsData.filter(filmData => filmData.characters.includes(personData.id));
        const filteredStarshipsData = starshipsData.filter(starshipData => starshipData.pilots.includes(personData.id));

        // Create starships map for fast lookup
        const starshipMap = new Map();
        filteredStarshipsData.forEach(starshipData => {
            starshipMap.set(starshipData.id, starshipData);
        });

        // To store ids of added starship nodes
        const addedStarshipNodes = new Set();

        newNodes.push({
            id: `person_${personData.id}`,
            position: { x: 0, y: 0 },
            data: { label: personData.name },
            type: 'input',
        });

        filteredFilmsData.forEach((filmData) => {
            newNodes.push({
                id: `film_${filmData.id}`,
                position: { x: 0, y: 0 },
                data: { label: filmData.title },
            });
            newEdges.push({ 
                id: `person_${personData.id}-film_${filmData.id}`, 
                source: `person_${personData.id}`, 
                target: `film_${filmData.id}`
            });

            filmData.starships.forEach(starshipId => {
                const starshipData = starshipMap.get(starshipId);
                if (starshipData) {
                    if (!addedStarshipNodes.has(starshipId)) {
                        newNodes.push({
                            id: `starship_${starshipData.id}`,
                            position: { x: 0, y: 0 },
                            data: { label: starshipData.name },
                            type: 'output'
                        });
                        addedStarshipNodes.add(starshipData.id);
                    }
                    newEdges.push({ 
                        id: `film_${filmData.id}-starship_${starshipData.id}`, 
                        source: `film_${filmData.id}`, 
                        target: `starship_${starshipData.id}`
                    });
                }
            })
        });

        setNodes([...newNodes]);
        setEdges([...newEdges]);

        setTimeout(() => {
            onLayout(newNodes, newEdges);
        }, 10)
        
    }, [personData, filmsData, starshipsData]);

    return (
        <div className={styles.wrapper}>
            <ReactFlow nodes={nodes} edges={edges} colorMode="dark" key={'personFlow'}>
                <Background />
                <Controls />
            </ReactFlow>
        </div>
    );
};

export function PersonDetailsFlow() {
    return (
      <ReactFlowProvider>
        <LayoutFlow />
      </ReactFlowProvider>
    );
  }