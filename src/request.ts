import axios, { AxiosPromise } from 'axios'

export type Method = "get" | "post" | "patch" | "delete"

export class Request<Q, R, H = {}> {
  
  /**
   * Need to escaping for each queries
   */
  public readonly query: Q
  public readonly headers?: H
  private cancelTokenSource = axios.CancelToken.source()

  constructor(query: Q, headers?: H) {
    this.query = query
    this.headers = headers
  }

  public cancel() {
    this.cancelTokenSource.cancel('Operation has been canceled by developer')
  }

  public call = (): AxiosPromise<R> => {
    switch (this.method()) {
      case "get": return this._getRequest()
      case "post": return this._postRequest()
      case "patch": return this._patchRequest()
      case "delete": return this._deleteRequest()
    }
  }

  protected path(): string{
    return ""
  }

  protected method(): Method {
    // default
    return "get"
  }

  protected params(): Q {
    return this.query
  }

  private _getRequest(): AxiosPromise<R> {
    return axios.get<R>(`${this.path()}`, {
      params: this.params(),
      paramsSerializer: this._paramSerializer,
      cancelToken: this.cancelTokenSource.token,
      headers:this.headers
    })
  }

  private _postRequest(): AxiosPromise<R> {
    return axios.post<R>(`${this.path()}`, this.params, {
      cancelToken: this.cancelTokenSource.token,
      headers:this.headers
    })
  }

  private _patchRequest(): AxiosPromise<R> {
    return axios.patch<R>(`${this.path()}`, this.params, {
      cancelToken: this.cancelTokenSource.token,
      headers:this.headers
    })
  }

  private _deleteRequest(): AxiosPromise<R> {
    return axios.delete<R>(`${this.path()}`, {
      params: this.params,
      paramsSerializer: this._paramSerializer,
      cancelToken: this.cancelTokenSource.token,
      headers:this.headers
    })
  }

  /**
   * Construct a query parameters. Axios adds '?' for the first parameter.
   * @param params Each parameters need to be escaped.
   */
  private _paramSerializer = (params: any): string => {
    return Object.keys(params).reduce((preValue, currentValue, currentIndex, array) => {
      return preValue + currentValue + '=' + params[currentValue] + ((array.length - 1) > currentIndex ? '&' : '')
    })
  }
}