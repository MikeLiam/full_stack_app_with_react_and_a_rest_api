import config from './config';

export default class Data {
  /**
   * Create request to api and return response
   * @param {String} path Uri to request
   * @param {String} method action to request
   * @param {Object} body for put post methods
   * @param {Boolean} requiresAuth if credentials needed at headers request
   * @param {Object} credentials email/password
   */
  api(path, method = 'GET', body = null, requiresAuth = false, credentials = null) {
    const url = config.apiBaseUrl + path;
  
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.emailAddress}:${credentials.password}`)

      options.headers['Authorization'] = `Basic ${encodedCredentials}`
    }

    return fetch(url, options);
  }
  /**
   * Asd for user and return user's credentials
   * @param {String} emailAddress 
   * @param {String} password 
   */
  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => data.user);
    } else if (response.status === 401) { // access denied to show validation errors
      const error = new Error(await response.json().then(data => data.message))
      error.status = response.status
      throw  error;
    }
    else {
      throw new Error(this.handlePageError(response.status));
    }
  }
  
  /**
   * Send credentials to create a new user
   * @param {Object} user 
   */
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    const code = response.status
    if (code === 201) {
      return [];
    }
    else{
      const error = await response.json().then(data => data)
      if (code === 400 || code === 500) { // bad request to show validation errors
        error.statusCode = response.status;
        // if existing emailaddres error (code 500 + error field)
        if (error.error) {
          error.errors = [error.message]
        }
        throw  error;
      } else {
        throw new Error(this.handlePageError(response.status));
      }
    }
  }

  /**
   * Request all courses availables
   */
  async getCourses() {
    const response = await this.api(`/courses`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else { 
      throw new Error(this.handlePageError(response.status));
    }
  }

  /**
   * Return course with id from api
   * @param {integer} id 
   */
  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else {
      throw new Error(this.handlePageError(response.status));
    }
  }
  
  /**
   * Request to create a new course with user authenticated credentials
   * @param {Object} course 
   * @param {String} emailAddress 
   * @param {String} password 
   */
  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
    if (response.status === 201) {
      return {message: "Course created", location: response.headers.get("Location")};
    }
    else if (response.status === 400) { // bad request to show validation errors
      const error = await response.json().then(data => data.error)
      throw  error;
    }
    else {
      throw new Error(this.handlePageError(response.status));
    }
  }

  /**
   * Request to update a course with id and with user authenticated credentials
   * @param {Integer} id 
   * @param {Object} course 
   * @param {String} emailAddress 
   * @param {String} password 
   */
  async updateCourse(id , course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password });
    if (response.status === 204) {
      return {location: `/courses/${id}`};
    }
    else if (response.status === 400 || response.status === 401) { // bad request or acces denied to show validation errors
      const error = await response.json().then(data => data.error)
      throw  error;
    }
    else {
      throw new Error(this.handlePageError(response.status));
    }
  }

  /**
   * Request to delete a course with id and with user authenticated credentials
   * @param {Integer} id 
   * @param {String} emailAddress 
   * @param {String} password 
   */
  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password });
    if (response.status === 204) {
      const message = `Course ${id} deleted correctly`
      return message
    }
    else if (response.status === 400 || response.status === 401) { // bad request or acces denied to show validation errors
      const error = await response.json().then(data => data.error)
      throw  error;
    }
    else {
      throw new Error(this.handlePageError(response.status));
    }
  }

  /**
   * Error handler return path depending on response's status code
   * @param {Integer} statusCode 
   */
  handlePageError(statusCode) {
    const code = statusCode
    if (code === 500) {
      return "/error"
    } else if (code === 403 ){
        return "/forbidden"
      } else if (code === 404) {
          return "/notfound"
    }
  }

}
