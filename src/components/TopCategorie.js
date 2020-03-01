import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import pole from "../img/polepole.png";
import yoga from "../img/yogayoga.png";
import gym from "../img/gymgym.png";
import fight from "../img/fight.png";
import styles from "../styles/TopCategories.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

function SampleNextArrow(props) {
  const { style, onClick } = props;
  return (
    <FontAwesomeIcon
      icon={faChevronRight}
      size={"2x"}
      style={{
        ...style,
        display: "block",
        cursor: "pointer"
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { onClick, style } = props;
  return (
    <FontAwesomeIcon
      icon={faChevronLeft}
      size={"2x"}
      style={{
        ...style,
        display: "block",
        cursor: "pointer"
      }}
      onClick={onClick}
    />
  );
}

export default class CenterMode extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 300,
      slidesToShow: 3,
      slidesToScroll: 1,
      nextArrow: <SampleNextArrow />,
      prevArrow: <SamplePrevArrow />
    };
    return (
      <div style={{ background: "rgb(183, 203, 238)", padding: "40px 10px" }}>
        <h2 className={styles.title}>Top categories</h2>
        <div className={styles.topCategories}>
          <Slider className={styles.slider} {...settings}>
            <div>
              <div className={styles.categorie}>
                <img src={gym} className={styles.categoriePhoto} />
                <span>Gym</span>
              </div>
            </div>
            <div>
              <div className={styles.categorie}>
                <img src={yoga} className={styles.categoriePhoto} />
                <span>Yoga</span>
              </div>
            </div>
            <div>
              <div className={styles.categorie}>
                <img src={fight} className={styles.categoriePhoto} />
                <span>Martial arts</span>
              </div>
            </div>
            <div>
              <div className={styles.categorie}>
                <img src={pole} className={styles.categoriePhoto} />
                <span>Pole dance</span>
              </div>
            </div>
          </Slider>
        </div>
      </div>
    );
  }
}