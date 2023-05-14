import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import ScrollMagic from 'scrollmagic';
import { LazyLoadImage } from 'react-lazy-load-image-component';

import './landing.css';

const ParallaxScroll = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      const controller = new ScrollMagic.Controller();
      const timelineDown = gsap.timeline();
      const timelineUp = gsap.timeline();

      const container = document.getElementsByClassName('container')[0];

    const profile_pic = document.getElementById('profile-pic');
    const profile_pic_faded = document.getElementById('profile-pic-faded');
    const port = document.getElementsByClassName('port');
    const folio = document.getElementsByClassName('folio');
    const text = document.querySelectorAll('.text');  

    timelineDown
      .fromTo(profile_pic,{ y: '-100%'}, { y: '0%', duration: 1.618} )
      .fromTo(profile_pic_faded,{ opacity: '0'}, { opacity: '1', duration: 1.618}, '-=1.618')
      .fromTo(port, { x: '-150' }, { x: '0', duration: 1.618 }, '+=3')
      .fromTo(folio, { x: '100' }, { x: '-150', duration: 1.618 }, '+=2.')
      text.forEach((element, index) => {
        timelineDown.fromTo(element, { y: '800' }, { y: '-30', duration: 1.618 }, index * 0.2)
      });

    timelineUp 
      .fromTo(profile_pic,{ y: '0%', duration: 1.618}, { y: '-100%'} )
      .fromTo(profile_pic_faded,{ opacity: '1' }, { opacity: '0', duration: 1.618}, '-=1.618')
      .fromTo(port,{x: '0'}, { x: '-150', duration: 1.618 }, '+=3')
      .fromTo(folio,{ x: '-150'}, { x: '100', duration: 1.618 }, '+=2.')
      text.forEach((element, index) => {
        timelineUp.fromTo(element, {y: '-30'}, { y: '800', duration: 1.618 }, index * 0.2) 
      });



      let sceneDown = new ScrollMagic.Scene({
        triggerElement: container,
        triggerHook: 0, // top of the viewport
        duration: "100%", // let's try making the scene's duration 100% of the viewport height
        reverse: false,
      })
        .setTween(timelineDown)
        .setPin(container)
        .addTo(controller);
      
      let sceneUp = new ScrollMagic.Scene({
        triggerElement: container,
        triggerHook: 1, // bottom of the viewport
        duration: "100%", // same duration as the sceneDown
        reverse: true,
      })
        .setTween(timelineUp)
        .setPin(container)
        .addTo(controller);
    }
  }, [loading]);


  useEffect(() => {
    const imageList = [
      "https://raw.githubusercontent.com/AJManzione/mjmanz_assets/master/img/page-1/port.png",
      "https://raw.githubusercontent.com/AJManzione/mjmanz_assets/master/img/page-1/author-faded.png",
      "https://raw.githubusercontent.com/AJManzione/mjmanz_assets/master/img/page-1/author.png",
      "https://raw.githubusercontent.com/AJManzione/mjmanz_assets/master/img/page-1/folio.png"
    ];

    const preloadImages = async () => {
      const loadPromises = imageList.map(src => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = resolve;
          img.onerror = reject;
        });
      });

      try {
        await Promise.all(loadPromises);
        setLoading(false);
      } catch (error) {
        console.log("Failed to preload images", error);
      }
    };

    preloadImages();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className='container'>
        <img
          src="https://raw.githubusercontent.com/AJManzione/mjmanz_assets/master/img_low/page-1-min/port-min.png"
          className="port"
        />
        <img
          src="https://raw.githubusercontent.com/AJManzione/mjmanz_assets/master/img_low/page-1-min/author-faded-min.png"
          id="profile-pic-faded"
          alt="Profile Picture Faded Background"
        />
        <ul className="text-container">
          <li className="text">motion
          <span>design</span></li>
          <li className="text">marketing & advertising design</li>
          <li className="text">visual identity design</li>
          <li className="text">graphic <span>design</span></li>
          <li className="text">interface graphic design</li>
          <li className="text">publication design</li>
          <li className="text">packaging design</li>
        </ul>
        <img
          src="https://raw.githubusercontent.com/AJManzione/mjmanz_assets/master/img_low/page-1-min/author-min.png"
          id="profile-pic"
          alt="Profile Picture"
        />
        <img
          src="https://raw.githubusercontent.com/AJManzione/mjmanz_assets/master/img_low/page-1-min/folio-min.png"
          className="folio"
        />
      </div>
      <div className='container'>
        <div className='content'> 
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem ut aperiam quaerat placeat est, corporis quisquam praesentium soluta. Sed minima reprehenderit aliquam! Rem qui quibusdam nemo expedita ut iste quam!</p>
        </div>
      </div>
    </div>
  );
};

export default ParallaxScroll;
