import React from 'react';
import InputField from './InputField';

function PathMapper(props) {
    return (
		<div>
        <div className="panel-block is-paddingless is-12">
		<div className="column is-2">
		</div>
		<div className="column">
        <div>
		Enter Root of directory path to be secured
		</div>
		
		
		<InputField onInputChangeUpdateField={props.onInputChangeUpdateField}
                            fields={props.fields} name="DirPath" Placeholder="Directory Path"/>

		
				<p className="control">
                        <a className="button is-success" 
                           onClick={() => props.hashFile()}>
                            Submit
                        </a>

                </p>
    </div>   
	<div className="column is-2">
	</div>
    </div>    
	</div>
    )
}

export default PathMapper;