export const pathKeys = {
    root: '/',
    home() {
        return pathKeys.root
    },
    people: {
        root() {
            return pathKeys.root.concat('people/')
        },
        bySlug({ slug }: { slug: number }) {
            return pathKeys.people.root().concat(slug.toString(), '/')
        },
    },
    person: {
        root() {
            return pathKeys.root.concat('person/')
        },
        bySlug({ slug }: { slug: string }) {
            return pathKeys.person.root().concat(slug, '/')
        },
    },
    page404() {
        return pathKeys.root.concat('404/')
    },
}