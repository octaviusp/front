class Config {

    FRONT_VERSION = "";
    URL = ""
    ENDPOINTS = {}
    
    constructor () {
        this.FRONT_VERSION =  "1.0.0"
        this.URL =  "http://localhost:8075/"
        this.ENDPOINTS = { "curso":"/cursos", "material":"/materiales", "tema":"/temas" }
    }   

    getBaseUrl() {
        return this.URL
    }

    getVersion() {
        return this.FRONT_VERSION
    }

}

export default Config;