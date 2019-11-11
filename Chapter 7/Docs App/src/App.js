import React, { Component } from 'react';
import Container from './Components/Container';
import Nav from './Components/Nav';
import Description from './Components/Description';


class App extends Component {
    constructor(){
        super();
		
        this.appName = 'DocsApp';
        this.onInputChangeUpdateField = this.onInputChangeUpdateField.bind(this);
		this.hashFile = this.hashFile.bind(this);
		this.compFiles = this.compFiles.bind(this);
		this.ccpPath = '/home/ishan/fabric-samples/first-network/connection-org1.json';
		
        this.state = {
				DirPath: null,
				status: 'Idle',
				fstatus: null,
				vstatus: false,
				modtime: null,
				files : [],
				verfile: [],
				remFile: [],
				addFile: [],
				MTH : null,
				FTH: null,
				tflag: true,
                fields: {
                DirPath: null,

            },
            
        };

        
    }


    onInputChangeUpdateField = (name,value) => {
        let fields = this.state.fields;

        fields[name] = value;

        this.setState({
            fields
        });
    };



startTimer = () =>{
	
	if(this.state.tflag == true)
	{
	console.log ("Started Timer");
	this.intervalHandle = setInterval(this.pathCheck,6000);
	
 
 	this.setState({
 			tflag: false
 				});
	
	}
	}

	
	

pathCheck = () =>{	
	
	
		
	let app = this;
		
	var DirPath = this.state.fields.DirPath;
	var modtime = this.state.modtime;
	var files = this.state.files;
		
	
		this.setState({
            status: 'Verifying'
        });
	

	
	fetch('http://localhost:3600/api/hashcheck', {
    method: 'POST',
	headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
	},
       	
    body: JSON.stringify({
						DirPath: DirPath,
						modtime: modtime,						
						})
  }).then(function(response,error) {
    if(response)
	{
	return response.json();	
	}
	else
	{
	console.log(error);
	}	
  }).then(function(data){
		app.setState({
			fstatus: data.result,
        });
		var filesNew = data.files;
		if(data.result == "Tampered")
		{	
		clearInterval(app.intervalHandle);
		var params = {files,filesNew}; 	
		app.compFiles(params);
		}
	});
}


fileCheck = () =>{
	
	const files = this.state.extFile;
	const DirPath = this.state.fields.DirPath;

	let app = this;
			
		
			
		fetch('http://localhost:3600/api/hashcheck', {
    	method: 'POST',
		headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
	},
       	
    body: JSON.stringify({
						DirPath: DirPath,
		                files: files   
						})
  }).then(function(response,error) {
    if(response)
	{
	return response.json();	
	}
	else
	{
	console.log(error);
	}	
  }).then(function(data){
		
		app.setState({
          
			verfile : data.res,
			vstatus: true
			
        })	
			
	});
		
	}
	

	
	
	
	
	hashFile = () => {
	
		let app = this;
		
	var DirPath = this.state.fields.DirPath;
	
		this.setState({
            status: 'Hashing'
        });
		
	
	fetch('http://localhost:3600/api/hashcheck', {
    method: 'POST',
	headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
	},
       	
    body: JSON.stringify({
						DirPath: DirPath})
  }).then(function(response,error) {
    if(response)
	{
	
	return response.json();
	}
	else
	{
	console.log(error);
	}	
  }).then(function(data){

		app.setState({
            DirPath: DirPath,
			status: 'Idle',
			files : data.files,
			MTH : data.MTH,
			FTH: data.FTH,
			modtime: data.modtime
        });
		
	});
	}
		
	
	 compFiles = (params) =>
{
		 let app = this;
	var files = params.files;
	var filesNew = params.filesNew;
		var addFile = [];
		var remFile = [];
		var extFile = [];
	
for (var i=0; i < filesNew.length; i++)
{
	var chk = false; 
	for (var j=0; j < files.length; j++)
	{
		if (filesNew[i] == files[j])
		{
			
		chk = true;	
		extFile.push(filesNew[i]);
		break;
		}
		
	}
	
	if (chk == false)
	{
		addFile.push(filesNew[i]);
	}	
		
}
		
		
for (var i=0; i < files.length; i++)
{
	var chk = false; 
	for (var j=0; j < filesNew.length; j++)
	{
		if (files[i] == filesNew[j])
		{			
		chk = true;	
		break;
		}
	}
	if (chk == false)
	{
		remFile.push(files[i]);
	}
}
	

	this.setState({
            extFile,
			remFile,
	 	   addFile
        });
	app.fileCheck();	 
	}

	
changeBView = (BView) =>
{	
	this.setState({
            BView: BView
        });
}	
	
componentDidMount(){
        
    }

    render() {
        
                return (
                    <div>
                        <Nav/>
						<Description/>
                        <Container onInputChangeUpdateField={this.onInputChangeUpdateField}
                                   DirPath={this.state.DirPath}
								   hashFile={this.hashFile}
                                   fields={this.state.fields}
								   status={this.state.status}
								   fstatus={this.state.fstatus}
								   vstatus={this.state.vstatus}
								   verfile={this.state.verfile}
								   remFile={this.state.remFile}
					               addFile={this.state.addFile}
								   BView={this.state.BView}	
								   changeBView={this.changeBView}
								   files={this.state.files}
								   MTH={this.state.MTH}
								   FTH={this.state.FTH}
								   startTimer = {this.startTimer}
                                    />
                    </div>
         
    )
}
}

export default App;