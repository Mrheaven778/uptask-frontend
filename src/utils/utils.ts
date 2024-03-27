
export function gormaDate(isoSate: string) {
    return new Date().toISOString().split('T')[0]
}