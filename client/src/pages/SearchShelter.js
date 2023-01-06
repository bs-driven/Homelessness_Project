import React, { useState, useEffect } from 'react';
import { Jumbotron, Container, Col, Form, Button, Card, CardColumns } from 'react-bootstrap';
import Auth from '../utils/auth';
import { saveShelter, shelterSearch } from '../utils/API';
import { saveShelterIds, getSavedShelterIds } from '../utils/localStorage';
import { useMutation } from '@apollo/client';


const SearchShelter = () => {
    const [searchedShelter, setSearchedShelters] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [savedShelterIds, setsaveShelterIds] = useState(getSavedShelterIds());
    // const  [savedShelter, { error }] =useMutation()
    useEffect(() => {
        return () => saveShelterIds(savedShelterIds);
    });

    const handleFormSubmit = async (e) =>{
        // e.preventDefalut();

        if(!searchInput){
            return false;
        }

        try{
            const response = await shelterSearch(searchInput);

            if (!response.ok){
                throw new Error('something went wrong.')
            }
            const { items } = await response.json();
            const shelterData = items.map((shelter) =>({
                shelterId: shelter.id,
                provider: shelter.provider,
                address: shelter.address,
                city: shelter.city,
                state: shelter.state,
                numberOfBeds: shelter.numbers_of_beds,
                ageServred: shelter.ages_served ,
                web_url: shelter.web_url

            }));
            setSearchedShelters(shelterData)
            setSearchInput('');
        } catch(err){
            console.log(err);
        }
    };

    const handleSaveShelter = async (shelterId) => {
        const shelterToSave = searchedShelter.find((shelter) => shelter.shelterId === shelterId);
        const token = Auth.loggedIn() ? Auth.getToken() : null;

        if (!token) {
            return false;
        }

        try {
            const response = await saveShelter(shelterToSave, token);
            if (!response.ok){
                throw new Error('something went wrong');
            }

            setsaveShelterIds([...savedShelterIds, shelterToSave.shelterId]);

        } catch (err) {
            // console.error(err);
        }
    };
    
    return (
        <>
        <Jumbotron fluid className = 'text-light bg-dark'><Container>
          <h1>Search for A Shelter!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Form.Row>
              <Col xs={12} md={8}>
                <Form.Control
                  name='searchInput'
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type='text'
                  size='lg'
                  placeholder='City'
                />
              </Col>
              <Col xs={12} md={4}>
                <Button type='submit' variant='success' size='lg'>
                  Search
                </Button>
              </Col>
            </Form.Row>
          </Form>
        </Container>
        </Jumbotron>

        <Container>
            <h2>
                {searchedShelter.length ? `Viewing ${searchedShelter.length} results:` : 'Search for a shelter again'}
            </h2>
            <CardColumns>
                {searchedShelter.map((shelterData) => {
                    return(
                        <Card key ={shelterData.shelterId} border = 'dark'>
                            <Card.Body>
                                <Card.Title>{shelterData.provider}</Card.Title>
                                <Card.Text>
                                {shelterData.city}','{shelterData.state}
                                Address:{shelterData.address}
                                Number of beds avaliable:{shelterData.numberOfBeds}
                                Ages served:{shelterData.ageServred}
                                Website:{shelterData.web_url}
                                    </Card.Text>
                                    {Auth.loggedIn() && (
                                        <Button  disabled={savedShelterIds?.some((savedShelterId) => savedShelterId === shelterData.shelterId)}
                                        className= 'btn-block btn-info' onClick= {() => handleSaveShelter(shelterData.shelterId)}>
                                            {savedShelterIds?.some((savedShelterId) => savedShelterId === shelterData.shelterId)? 'This shelter has been saved already.' :'Save this Shelter'}
                                        </Button>
                                    )}
                            </Card.Body>
                        </Card>
                    );
                })}
            </CardColumns>
        </Container>
        </>
    );

};

export default SearchShelter;