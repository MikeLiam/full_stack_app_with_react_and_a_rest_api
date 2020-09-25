import config from './config';

export default class Data {
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

  async getUser(emailAddress, password) {
    const response = await this.api(`/users`, 'GET', null, true, { emailAddress, password});
    if (response.status === 200) {
      return response.json().then(data => data.user);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error(this.handlePageError(response.status));
    }
  }
  
  async createUser(user) {
    const response = await this.api('/users', 'POST', user);
    if (response.status === 201) {
      return [];
    }
    else if (response.status === 400) {
      return response.json().then(data => {
        return data.errors;
      });
    }
    else {
      throw new Error(this.handlePageError(response.status));
    }
  }

  async getCourses() {
    const response = await this.api(`/courses`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error(this.handlePageError(response.status));
    }
  }

  async getCourse(id) {
    const response = await this.api(`/courses/${id}`, 'GET', null);
    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      throw new Error(this.handlePageError(response.status));
    }
  }
  
  async createCourse(course, emailAddress, password) {
    const response = await this.api('/courses', 'POST', course, true, { emailAddress, password });
    if (response.status === 201) {
      return {message: "Course created", location: response.headers.get("Location")};
    }
    else if (response.status === 400) {
      throw  new Error( await response.json().then(data => data.message));
    }
    else {
      throw new Error(this.handlePageError(response.status));
    }
  }

  async updateCourse(id , course, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'PUT', course, true, { emailAddress, password });
    if (response.status === 204) {
      return {location: `/courses/${id}`};
    }
    else if (response.status === 400 || response.status === 401) {
      const error = new Error()
      error.statusCode = 400
      error.message = await response.json().then(data => data.message)
      throw  error;
    }
    else {
      throw new Error(this.handlePageError(response.status));
    }
  }

  async deleteCourse(id, emailAddress, password) {
    const response = await this.api(`/courses/${id}`, 'DELETE', null, true, { emailAddress, password });
    if (response.status === 204) {
      const message = `Course ${id} deleted correctly`
      return message
    }
    else if (response.status === 400 || response.status === 401) {
      const message=  await response.json().then(data => data.message)
      const error = new Error(message)
      error.statusCode = response.status
      throw  error
    }
    else {
      throw new Error(this.handlePageError(response.status));
    }
  }

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
