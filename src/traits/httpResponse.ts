class HttpResponse {
    success (data: any, message: String) {
        let res = new Response(JSON.stringify({
            'success': true,
            'message': message,
            'data': data,
        }))
        res.headers.set('Access-Control-Allow-Origin', '*');
        res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.headers.set('Access-Control-Allow-Headers', '*')
        res.headers.set('Content-Type', 'application/json')
        return res;
    }
    error (data: null, message: String) {
        let res = new Response(JSON.stringify({
            'success': false,
            'message': message,
            'data': data
        }))
        res.headers.set('Access-Control-Allow-Origin', '*');
        res.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        res.headers.set('Access-Control-Allow-Headers', '*')
        res.headers.set('Content-Type', 'application/json')
        return res;
    }
}
export default HttpResponse;