import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import mapMarkerImg from '../images/map-marker.svg';
import { Map, TileLayer, Marker, Popup} from 'react-leaflet';

import '../styles/pages/orphanages-map.css';

import mapIcon from '../utils/mapIcon';
import api from '../services/api';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
}


function OrphanagesMap() {

    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    console.log(orphanages);

    useEffect(() => {
        api.get('orphanages').then(response => {
            setOrphanages(response.data);
        });

    }, []);

    return (
        <div id = 'page-map'>
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Nova Iguaçu</strong>
                    <span>Rio de Janeiro</span>

                </footer>
            </aside>

           <Map
           center={[-22.7456436,-43.5126098]}
           zoom={15}
           style={{width: '100%', height: '100%'}}
           >
               <TileLayer url = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />


            {orphanages.map(orphanage => {
                return (
                    <Marker position={[orphanage.latitude,orphanage.longitude]} 
                    icon = {mapIcon}
                    key = {orphanage.id}
                    >
                        <Popup closeButton = {false} minWidth={220} maxHeight={220} className={"map-popup"}>
                             {orphanage.name}
                             <Link to = {`/orphanages/${orphanage.id}`}>
                                 <FiArrowRight size={25} color={'#FFF'}/>
                             </Link>
                        </Popup>
     
                    </Marker>
                )
            })}
            </Map>

            <Link to = "orphanages/create" className = "create-orphanage">
                <FiPlus size= {12} color = "#FFF"/>
            </Link>
        </div>
    );
}

export default OrphanagesMap;