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
        bySlug({ slug }: { slug: number }) {
            return pathKeys.person.root().concat(slug.toString(), '/')
        },
    },
    page404() {
        return pathKeys.root.concat('404/')
    },
}