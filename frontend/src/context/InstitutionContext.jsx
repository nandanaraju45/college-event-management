import { createContext, useContext } from "react";
import axios from "axios";

const InstitutionContext = createContext();

export const InstitutionProvider = ({ children }) => {
    const token = localStorage.getItem("token");

    // 1. Register College Admin
    const registerCollegeAdmin = async (adminData) => {
        const res = await axios.post("http://localhost:5000/api/auth/register", adminData);
        return res.data; // must return created user
    };

    // 2. Create Institution
    const createInstitution = async (institutionData) => {
        const res = await axios.post("http://localhost:5000/api/institutions", institutionData, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        return res.data;
    };

    return (
        <InstitutionContext.Provider
            value={{ registerCollegeAdmin, createInstitution }}
        >
            {children}
        </InstitutionContext.Provider>
    );
};

export const useInstitution = () => useContext(InstitutionContext);
