import pages from './pages';

export function urlBuild( page: string, params?: Record<any, any>) {
    const pageFolder = pages[page];

    const searchParams = new URLSearchParams(params);

    const url = searchParams? `${pageFolder.concat('?')}${searchParams.toString()}`: pageFolder;

    return url;
}