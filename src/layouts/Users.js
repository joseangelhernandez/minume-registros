import { useState,useEffect } from "react"
import axios from "api/axios";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        let isMounted = true;
        const controller = new AbortController();
        const getUser = async () => {
            try {
                const response = await axios.get('/USUARIOS', { signal: controller.signal });
                console.log(response.data);
                if (isMounted) setUsers(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        getUser();

        return () => {
            isMounted = false;
            controller.abort();
        };
    }, []);


  return (
    <article>
        <h1>Users</h1>
        {users?.length
            ? (
                <ul>
                    {users.map((user,i) => <li key={i}>{user?.username}</li>)}
                </ul>
            )
            :<p>No hay usuarios para mostrar.</p>
        }
    </article>
  );
}

export default Users