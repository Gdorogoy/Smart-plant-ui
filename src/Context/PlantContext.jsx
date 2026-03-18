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
    const [plants, setPlants] = useState(null);
    const [statistics, setStatistics] = useState(null);


    const refetchData = () => setRefreshStats(prev => prev + 1);

    const setAuthInfo = (token, authId) => {
        setAuth({
            authId: authId,
            token: token
        });
    }

    const setUserInfo = (userProfile) => {
        setUserProfile(userProfile);
    }

    const logout = () => {
        setAuth(null);
        setUserProfile(null);
        setLoading(false);
        setPlants(null);
        setStatistics(null);
    }


    useEffect(() => {
        if (!auth) return;
        const fetchData = async () => {
            try {
                setLoading(true);
                const dashboardRes = await getDashboardInfo(userProfile.id, auth.token);
                setPlants(dashboardRes.data.plants);
                setStatistics(dashboardRes.data.statistics);
                setLoading(false);
            } catch {
                setLoading(false);
                window.location.href = '/login';
            }
        }
        fetchData();
    }, [auth, refreshStats]);

    useEffect(() => {
        if (!auth) return;
        fetch();
    }, [auth, refreshStats]);


    return (
        <PlantContext.Provider value={{
            userProfile, auth, plants, statistics, loading,
            setAuthInfo, setUserInfo, refetchData, logout
        }}>
            {children}
        </PlantContext.Provider>
    );
}

export default PlantContextProvider;