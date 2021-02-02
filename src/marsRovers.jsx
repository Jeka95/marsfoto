import React, { useState } from 'react';
import FormControl from '@material-ui/core/FormControl';
import DropDown from "./DropDown";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import axios from "axios";

import "./marsRovers.scss";


const API_KEY = "bJmIB9IyLmsVWzocgJbtXozA1P46Ya0e0ZafikiS";
const API = "https://api.nasa.gov/mars-photos/api/v1/rovers/";


const MarsRovers = () => {
  const [solValue, setSolValue] = useState(null);
  const [cameraValue, setCameraValue] = useState(null);
  const [roverValue, setRoverValue] = useState(null);

  const [nofoto, setNoFoto] = useState(null);
  const [foto, setFoto] = useState(null);

  const [page, setPage] = useState(1);
  const [showMore, setShowMore] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios
      .get(`${API}${roverValue}/photos?sol=${solValue}&camera=${cameraValue}&page=${1}&api_key=${API_KEY}`)
      .then(res => {
        const photosData = res.data.photos;
        setNoFoto(false);
        if (photosData.length > 0) {
          setFoto(photosData);
        }
        if (photosData.length === 25) {
          setShowMore(true);
        }
        if (photosData.length === 0) {
          setNoFoto(true);
          setShowMore(false);
          setFoto([])
        }
        setPage(1);
      })
  }

  const LoadMore = async (e) => {
    e.preventDefault();
    await axios
      .get(`${API}${roverValue}/photos?sol=${solValue}&camera=${cameraValue}&page=${page + 1}&api_key=${API_KEY}`)
      .then(res => {
        const photosData = res.data.photos;
        setFoto(foto.concat(photosData))
        if (photosData.length === 25) {
          setPage(page + 1)
        } else {
          setShowMore(false);
          setPage(1);
        }
      })
  }

  const roverOptions = [
    { value: "curiosity", label: "Curiosity" },
    { value: "opportunity", label: "Opportunity" },
    { value: "spirit", label: "Spirit" },
  ];

  const cameraOptions = [
    { value: "FHAZ", label: "Front Hazard Avoidance Camera" },
    { value: "RHAZ", label: "Rear Hazard Avoidance Camera" },
    { value: "MAST", label: "Mast Camera" },
    { value: "CHEMCAM", label: "Chemistry and Camera Complex" },
    { value: "MAHLI", label: "Mars Hand Lens Imager" },
    { value: "MARDI", label: "Mars Descent Imager" },
    { value: "NAVCAM", label: "Navigation Camera" },
    { value: "MINITES", label: "Miniature Thermal Emission Spectrometer (Mini-TES)" },
  ];



  return (
    <div className="mars-rovers" >
      <div className="mars-rovers__input">
        <h1 className='mars-rovers__title'>Mars Rovers Photos</h1>
        <div className="mars-rovers__welcome">Search photos done by NASA's  rovers on Mars!</div>
        <form onSubmit={(e) => onSubmit(e)} className="mars-rovers__form" >
          <FormControl>
            <DropDown
              required
              className="drop-down"
              label="Choose Rover"
              id="rover"
              options={roverOptions}
              onClick={setRoverValue}
            />
            <DropDown
              required
              className="drop-down"
              label="Choose Camera"
              id="age"
              options={cameraOptions}
              onClick={setCameraValue}
            />
            <TextField
              required
              id="standard-number"
              label="Martian day"
              type="number"
              className="text-field"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setSolValue(e.target.value)}
            />

            <Button className="submit-button" type="submit" style={{ margin: "20px" }} variant="contained">Search Photos</Button>
          </FormControl>
        </form>
      </div>
      <div className="mars-rovers__content">
        {foto
          ? foto.map(({ img_src }, index) => {
            return (
              <img className="mars-rovers__img" key={index} src={img_src} alt="image of mars rover" />
            );
          })
          : null
        }
        {nofoto
          ? <div className="mars-rovers__no-photos">
            No photos for your request where found. Please try again with another options!
            </div>
          : null
        }
        {
          showMore
            ? <Button className="submit-button" type="button" style={{ color: "red" }} onClick={(e) => LoadMore(e)} >Load More</Button>
            : null
        }
      </div>
    </div >
  );
};


export default MarsRovers