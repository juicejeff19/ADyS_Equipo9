import axios from 'axios';

const API = 'http://localhost:3001/clubleones/';

export const loginAdminRequest = (admin: { email: string; password: string }) => {
    return axios.post(`${API}admin/login`, admin, { withCredentials: true });
};

export const logoutAdminRequest = () => {
    return axios.post(`${API}admin/logout`, {}, { withCredentials: true });
};


export const loginInstrucRequest = (instructor: { email: string; password: string }) => {
    return axios.post(`${API}instructor/login`, instructor, { withCredentials: true });
};

export const logoutInstrucRequest = () => {
    return axios.post(`${API}instructor/logout`, {}, { withCredentials: true });
};


export const loginSuAdminRequest = (admin: { email: string; password: string }) => {
    return axios.post(`${API}superadmin/login`, admin, { withCredentials: true });
};


export const logoutSuAdminRequest = () => {
    return axios.post(`${API}superadmin/logout`, {}, { withCredentials: true });
}

export const registerEventRequest = (eventData: {
    name: string;
    startDate: Date;
    endDate: Date;
    closingOfRegistrations: Date;
    mode: string[];
    cost: number;
    requirements: string;
    rules: string;
    kilometers: number;
    description?: string;
  }) => {
    return axios.post(`${API}admin/profile/registrarEvento`, eventData, { withCredentials: true });
  }

  export const registerResultsRequest = (eventData: {
    name: string;
    eventId: string;
    sessionId: string;
    category: string;
    gender: string; 
    distanceKm: number;
    time: string;
    age: number;
  }) => {
    return axios.post(`${API}instructor/profile/registerResults`, eventData, { withCredentials: true });
  }

  export const fetchUserByIdRequest = (id: string) => {
    return axios.get(`${API}admin/profile/${id}`, { withCredentials: true, responseType: 'blob' });
  };
  