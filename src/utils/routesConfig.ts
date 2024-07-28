export const pathKeys = {
    root: '/',
    home() {
        return pathKeys.root
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