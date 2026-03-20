import { useEffect } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { getDashboardInfo } from '../Api/dashboard.api';


export const PlantContext = createContext();


const PlantContextProvider = ({ children }) => {

    const [refreshStats, setRefreshStats] = useState(0);

    const [userProfile, setUserProfile] = useState(null);
    const [auth, setAuth] = useState(null);
    const [loading, setLoading] = useState(true);
    const [plants, setPlants] = useState([]);
    const [statistics, setStatistics] = useState(null);


    const refetchData = () => setRefreshStats(prev => prev + 1);

    const setAuthInfo = (token, userProfile) => {
        const authObj = { token };
        setAuth(authObj);
        setUserProfile(userProfile);
        localStorage.setItem('auth', JSON.stringify(authObj));
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }

    const setUserInfo = (userProfile) => {
        setUserProfile(userProfile);
        localStorage.setItem('userProfile', JSON.stringify(userProfile));
    }

    const logout = () => {
        setAuth(null);
        setUserProfile(null);
        setLoading(false);
        setPlants(null);
        setStatistics(null);
        localStorage.removeItem('auth');
        localStorage.removeItem('userProfile');
    }

    useEffect(() => {
        const savedAuth = localStorage.getItem('auth');
        const savedProfile = localStorage.getItem('userProfile');
        if (savedAuth && savedProfile) {
            setAuth(JSON.parse(savedAuth));
            setUserProfile(JSON.parse(savedProfile));
            console.log(savedProfile)
        } else {
            setLoading(false);
        }
    }, []);


    useEffect(() => {
        if (!auth) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                const dashboardRes = await getDashboardInfo(userProfile.id, auth.token);
                setPlants(dashboardRes.plants);
                setStatistics(dashboardRes.statistic);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log("error !!! ", error);
            }
        }
        fetchData();
    }, [auth, refreshStats]);

    return (
        <PlantContext.Provider value={{
            userProfile, auth, plants, statistics, loading, setLoading,
            setAuthInfo, setUserInfo, refetchData, logout
        }}>
            {children}
        </PlantContext.Provider>
    );
}

export default PlantContextProvider;