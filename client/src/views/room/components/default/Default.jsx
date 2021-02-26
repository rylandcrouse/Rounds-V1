import { Observer, observer } from 'mobx-react-lite';
import React, { useContext, useEffect, useRef, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { context } from '../../../../index.js';
import Video from '../video/video';
import { Container, DefaultVideos, RoomIdBox, Options, SideOpts, LeaveBtn, Content, DfltVidBox } from './../../styled';


const DefaultView = observer(() => {
    const store = useContext(context);

    return (
        <DefaultVideos id='DfltVideos'>
            {Object.keys(store.io.streams).map(id => <DfltVidBox key={id}><Video id={id} key={id} /></DfltVidBox>)}
            {Object.keys(store.io.streams).map(id => <DfltVidBox key={id}><Video id={id} key={id} /></DfltVidBox>)}
            {Object.keys(store.io.streams).map(id => <DfltVidBox key={id}><Video id={id} key={id} /></DfltVidBox>)}
            {Object.keys(store.io.streams).map(id => <DfltVidBox key={id}><Video id={id} key={id} /></DfltVidBox>)}
            {Object.keys(store.io.streams).map(id => <DfltVidBox key={id}><Video id={id} key={id} /></DfltVidBox>)}
            {Object.keys(store.io.streams).map(id => <DfltVidBox key={id}><Video id={id} key={id} /></DfltVidBox>)}

        </DefaultVideos>
    )
});

export default DefaultView;
