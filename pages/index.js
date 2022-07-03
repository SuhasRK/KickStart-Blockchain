import React, { Component, useState,useEffect } from 'react'
import { Card } from 'semantic-ui-react'
import factory from '../ethereum/factory'

function CampaignIndex({addresses}){

    function renderCampaign(){
        const items=addresses.map(address=>{
            return {
                header:address,
                description : <a>View Campaign</a>,
                fluid : true
            }
        })

        return <Card.Group items={items} />

    }

    return <div>
          <link
            async
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/semantic-ui@2/dist/semantic.min.css"
        />
        {renderCampaign()}
        </div>
}

CampaignIndex.getInitialProps=async ()=>{
    const campaigns=await factory.methods.getDeployedCampaigns().call()
    return {addresses:campaigns};
}


export default CampaignIndex;