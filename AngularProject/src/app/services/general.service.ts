import { Injectable } from '@angular/core';
import axios, { AxiosResponse } from 'axios';
import { IClient } from '../interfaces/i-client';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  private baseUrl: string = 'http://localhost:4200/mnt/';

  constructor(private http: HttpClient) { }

  /**
   * getClients
   */
  public executeRequest(dir:string = 'client') {
    return axios.get(`${this.baseUrl}${dir}`);
  }
  
  /**
   * executeRequestPost
   */
   public executeRequestPost(clientData: any, dir: string = 'client') {
    return axios.post(`${this.baseUrl}${dir}`, clientData);
  }
  /**
   * executeRequestPut
   */
   public async executeRequestPut(clientData: any, dir: string = 'client') {
    return axios.put(`${this.baseUrl}${dir}`, clientData);
  }
  
  /**
   * executeRequestPost
   */
   public executeRequestDelete(dir: string = 'client') {
    return axios.delete(`${this.baseUrl}${dir}`);
  }

  
}
