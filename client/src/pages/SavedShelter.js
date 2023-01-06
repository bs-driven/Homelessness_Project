import React, { useEffect, useState } from 'react';
import Auth from '../utils/auth';
import { Jumbotron, Container, CardColumns, Card, Button } from 'react-bootstrap';
import { removeShelterId } from '../utils/localStorage';
import { getMe, deleteShelter } from '../utils/API';

const SavedShelters = () => {
    const [userData, setUserData] = useState({});
    
    const userDataLength = Object.keys(userData).length;

    useEffect(() => {
        const getUserData = async () => {
            try{
                const token = Auth.loggedIn() ? Auth.getToken() : null;
                if (!token){
                    return false;
                }

                const response = await getMe(token);
                if(!response.ok) {
                    throw new Error('something went wrong.');
                }
                const user = await response.json();
                setUserData(user);
            } catch (err) {
                console.error(err);
            }
        };

        getUserData();
    }, [userDataLength]);

    const handleDeleteShelter = async (shelterId) => {
        const token = Auth.loggedIn() ? Auth.getToken() :null;

        if(!token){
            return false;
        }

        try {
            const response = await deleteShelter(shelterId, token);

            if (!response.ok) {
                throw Error('something went wrong');
            }

            const updateUser = await response.json();
            setUserData(updateUser);
            removeShelterId(shelterId);
        } catch (err) {
            console.error(err);
        }
    };

    if (!userDataLength){
        return <h2>LOADING...</h2>
    }
    return(
        <>
        <Jumbotron fluid className='text-light bg-dark'>
            <Container>
                <h1> Vieweing Save Shelters</h1>
            </Container>
        </Jumbotron>
        <Container>
            <h2>
                {userData.SavedShelters.length
                ? `Viewing ${userData.savedShelters.length} saved ${ userData.savedShelters.length === 1 ? 'shelter' : 'shelters'}:`
            : 'Yu have know saved shelters.'}
            </h2>
            <CardColumns>
                {userData.savedShelters.map((shelter) =>{
                    return (
                        <Card key ={shelter.shelterId} border= 'dark'>
                            <Card.body>
                                <Card.Title>{shelter.provider}</Card.Title>
                                    <Card.Text>
                                        {shelter.city}','{shelter.state}
                                        Address:{shelter.address}
                                        Number of beds avaliable:{shelter.numberOfBeds}
                                        Ages served:{shelter.ageServred}
                                        Website: {shelter.web_url}
                                    </Card.Text>
                                    <Button className='btn-block btn-danger' onClick={() => handleDeleteShelter(shelter.shelterId)}>
                                        Delete this Shelter!
                                    </Button>
                            </Card.body>
                        </Card>
                    );
                })}
            </CardColumns>
        </Container>
        </>
    );
};

export default SavedShelters;