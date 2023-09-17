class HttpResponse {
    success (data: any, message: String) {
        return {
            'success': true,
            'message': message,
            'data': data,
        }
    }
    error (data: null, message: String) {
        return {
            'success': false,
            'message': message,
            'data': data
        }
    }
}
export default HttpResponse;