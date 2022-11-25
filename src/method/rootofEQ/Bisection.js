import React, { Component } from 'react'
import 'antd/dist/antd.min.css';
import { Card, Input, Button, Table } from 'antd';
import { error, func} from '../../Useful/Chage';
import Graph from '../../Useful/Graph';
import "../../component.css"
const InputStyle = {
	background: "#5F9EA0",
	color: "white",
	fontWeight: "bold",
	fontSize: "24px"

};
var dataTable=[]
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "XL",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "XR",
        dataIndex: "xr",
        key: "xr"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    },
    {
        title: "F(x)",
        key: "fxanser",
        dataIndex: "fxanser"
    }
];
class Bisection extends Component{
	constructor(){
		super();
		this.state={
            fx: "",
            xl: 0,
            xr: 0,
            error: 0,
            inputerror: 0,
            showOutputCard: false,
            showGraph: false,
            showcheckans : false,
        };
		this.handleChange=this.handleChange.bind(this);// JavaScript เมธอดของคลาสจะไม่ถูกผูกไว้โดยค่าเริ่มต้น bind เพื่อกำหนดFuc onclick 
		this.bisection=this.bisection.bind(this);
	}
	bisection(xl,xr,inputerror){
		var increaseFunction = false;
        var xm = 0;
        var sum = parseFloat(0.000000);
        var n = 0; 
		var data=[]
		data['xl']=[]
		data['xr'] = []
        data['x'] = []
        data['error'] = []
        data['fxanser']=[]
		if (func(this.state.fx, xl) < func(this.state.fx, xr)) {
            increaseFunction = true;
        }
		do{
			xm=(xl+xr)/2;
            if (func(this.state.fx, xm) * func(this.state.fx, xr) < 0){
                sum = error(xm, xr);
                if (increaseFunction) {
                    xl = xm;
                }
                else {
                    xr = xm;
                }
            }else {
                sum = error(xm, xl);
                if (increaseFunction) {
                    xr = xm;
                }
                else {
                    xl = xm;
                }
            }
            data['xl'][n] = xl;
            data['xr'][n] = xr;
            data['x'][n] = xm;
            data['error'][n] = Math.abs(sum).toFixed(8);
            data['fxanser'][n] = func(this.state.fx , xm);
            n++;

		}while (Math.abs(sum) > inputerror );
		this.createTable(data['xl'], data['xr'], data['x'], data['error'],data['fxanser']);
        this.setState({
            showOutputCard: true,
            showGraph: true,
            showcheckans : true
        })
	}
    createTable(xl,xr,x,error,fxanser){
        dataTable=[]
        for (let i = 0; i < xl.length; i++) {
            dataTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
                error: error[i],
                fxanser : fxanser[i]
            })

        }
        
    }
    reversefunc(){

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
	render(){ 
        let { fx, xl, xr, inputerror } = this.state;
		return(
			<div style={{ background: "#FFFF", padding: "30px" }}>
				<h2 style={{ color: "black", fontWeight: "bold" }}>Bisection</h2>
				<div className="row">
                    <div className="col">
					<Card
                            bordered={true}
                            style={{ background: "DarkSlateGray", borderRadius:"15px", color: "#FFFFFFFF" }}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style={{color:"white"}}>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2 style={{color:"white"}}>X<sub>L</sub></h2><Input size="large" name="xl" style={InputStyle}></Input>
                            <h2 style={{color:"white"}}>X<sub>R</sub></h2><Input size="large" name="xr" style={InputStyle}></Input><br /><br />
                            <h2 style={{color:"white"}}>Error</h2><Input size="large" name="inputerror" style={InputStyle}></Input>
                            <div className="row">
                                <div className="center">
                                    <Button id="submit_button" onClick= {()=> this.bisection(parseFloat(xl), parseFloat(xr), parseFloat(inputerror))} 
                                    style={{ background: "#4caf50", color: "white"  }}>Submit</Button>
                                </div>
							</div>
					</Card>
				</div>
                <div className='col'>
                        {this.state.showGraph && <Graph fx={fx} title="Bisection Method" />}
                </div>
			</div>
            <div className='row'> 
            {this.state.showOutputCard &&
                        <Card
                            title={"Output"}
                            bordered={true}
                            style={{ width: "100%", background: "#2196f3", color: "#FFFFFFFF" }}
                            id="outputCard"
                        >
                            <Table columns={columns} dataSource={dataTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}></Table>
                        </Card>
                    }
            </div>
			</div>
		);
    }
}

export default Bisection