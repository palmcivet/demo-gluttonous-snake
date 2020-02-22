import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch, AnyAction } from "redux";
import { rootState } from "../../Store/index";
import "./style.less";

interface IState {}

interface IProps {
	value: number;
	clock?: boolean;
}

class NumberView extends Component<IProps, IState> {
	constructor(props: IProps) {
		super(props);
		console.log(this.props.clock);
	}

	render() {
		let v = this.props.value;
		const numArr = Array(5).fill("n");

		if (this.props.clock === undefined) {
			for (let i = 0; v > 0 && i < numArr.length; i++) {
				numArr[i] = (v % 10).toString();
				v = Math.floor(v / 10);
			}
			numArr.reverse();

			return (
				<div className="number">
					{numArr.map((item, index) => (
						<span className={`bg s_${item}`} key={index}></span>
					))}
				</div>
			);
		} else {
			numArr[2] = "d";

			return (
				<div className="number">
					{numArr.map((item, index) => (
						<span className={`bg s_${item}`} key={index}></span>
					))}
				</div>
			);
		}
	}
}

const mapStateToProps = (state: rootState) => {
	return {};
};

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => {
	return {};
};

const Number = connect(mapStateToProps, mapDispatchToProps)(NumberView);

export { Number };
