import React, { Component } from 'react';
import { searchData, Police, Crime } from './config/api.js'
import PrimarySearchAppBar from './Components/AppBar.js'

import './MyStyle.css';
import './config/DropDown.css';


export default class List extends Component {
    constructor() {
        super();

        this.state = {
            Crimelist: [],
            Policelist: [],
            selectedPolice : "",
            selectedCrime : "",
            result: [],
         
            text: '',
            limit : 15,
            loading: false,
            clicked: false
        }
        this.fetchData.bind();

        this.DisplayData.bind();

    }

    async btnClick() {
       
        const {selectedCrime, selectedPolice,Policelist,Crimelist} = this.state;
        console.log("police............/")
        //this.fetchData(selectedCrime, selectedPolice);
        if (this.refs.policeName) {
           

            var Filtervalue = this.refs.policeName.value;
            console.log(Filtervalue)
            var policeid ;
           
  
            const FinalResultMap = Policelist.map((value,index) => {
           
              if (value.name === Filtervalue) {
               
                policeid = value.id;
                console.log(policeid)
                  
              } 
             
              
             
  
          });


          }
          

          if (this.refs.crimeName) {
            console.log("Crime............/")
            var Filtervalue1 = this.refs.crimeName.value;
            console.log(Filtervalue1)
            var crimeUrl;

            const FinalResultMap = Crimelist.map((value,index) => {
           
                if (value.name === Filtervalue1) {
                 
                  crimeUrl = value.url;
                  console.log(crimeUrl)
                    
                } 
               
                
               
    
            });
          }

        try {
            console.log(crimeUrl)
            //Fecthing Data From Api.js 3rd Api by Passing Dynamics query value
            const data1 = await searchData(crimeUrl, policeid);
           

            this.setState({
                
                result: data1,
              
            })
            
           
        } catch (error) {
            
        }


        

        this.setState({ clicked: true });
        // this.state ={data: 'sds'};
    }

    componentDidMount() {
        const {selectedCrime, selectedPolice} = this.state;
        this.fetchData(selectedCrime, selectedPolice);

    }



    DisplayData(police, crime) {
        

        //Displaying Data In The DropDown List 
        //Reterieing Data From Fetch Menthod and the save it in to list given below

        this.setState({
           
            Crimelist: crime,
            Policelist: police,
        })
    }

    async fetchData(crimecategory,policeforce) {
        const { selectedCrime, selectedPolice } = this.state;

       
        this.setState({
            loading: true
        })

        try {
           

            const police = await Police();  //fetching police Data 
            
            const crime = await Crime();  //fetching Crime Data 
         

            this.DisplayData(police, crime)


        } catch (error) {

        }
        finally {

            this.setState({

                loading: false
            })

        }
    }

    // For Checking The Scroll React The Bottom 
    onScrolle(e){
        this.setState({limit : this.state.limit + 15 })
          
           if(e.target.scrollHeight === Math.ceil(e.target.scrollTop + e.target.clientHeight)  ){
            console.log(Math.ceil(e.target.scrollTop + e.target.clientHeight),"========================");
             this.loadMore();
           }
           
      }
     //If Bottom Then Load More data
      loadMore(){
        console.log("succeeded");
        this.setState({limit : this.state.limit + 15 })
      }
      
      
     
      

    


    render() {
        const { Crimelist, Policelist,loading, result,  clicked } = this.state;
       
        var temp = [...result]
        temp.length = this.state.limit;
       
       


        const FinalResultMap = result.map((value,index) => {
         
            return (
            
                <tr key={index}>
                    <td >{value.category}</td>
                    <td>{value.outcome_status.date}</td>
                    <td>{value.outcome_status.category}</td>
                </tr>
            

            )


        });
     

        const PoliceName = Policelist.map((value,index) => {
           
            return (
            
              
                <option key={index}>{value.name}</option>
                

            )


        });


        const CrimeName = Crimelist.map((value,index) => {
         
            return (
            
               
                <option key={index}>{value.name}</option>

            )


        });

        // const arr = text.length ? result : list;
        //console.log(policeMap);
        return (
            <div>
                <PrimarySearchAppBar />
                <br />
                {/* <select  onChange={(e) => this.setState({selectedPolice: e.target.value,clicked:false})}> */}
                <select ref="policeName" >
                 {PoliceName}
                </select>
               
                <br />
                <br />
                <select select ref="crimeName" >
                 {CrimeName}
                </select>

                <br />
                
                <br />
                {/* <ButtonClass title = "abc" onClickEvent={this.getData.bind()}/> */}

                <button onClick={this.btnClick.bind(this)}>Get Data</button>
                <div onScroll={ this.onScrolle.bind(this)} style={{height : '500px',border :'2px solid black ',overflow : 'scroll'}}>

                <table id="customers">
                    <tbody>
                        <tr>
                            <th>Category</th>
                            <th>Month</th>
                            <th>Out Come</th>
                        </tr>

                        {/* {clicked && FinalResultMap.length ? FinalResultMap : "No Data Found" } */}
                        {loading ? "Hello World" : (clicked && FinalResultMap.length ? FinalResultMap : "No Data Found")}


                    </tbody>
                </table>
                </div>

            </div>


        )
    }
}