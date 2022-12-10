export class Domain {
    static getDomain(uri) {
        return (uri.split('/')[2] || uri.split('/')[0]).split(':')[0];
    };
}