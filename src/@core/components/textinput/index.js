import React from "react";
import { Input } from 'reactstrap'
const formatter = new Intl.NumberFormat("en-US", { minimumFractionDigits: 0 });
const idnFormatter = new Intl.NumberFormat("id-ID", {
	minimumFractionDigits: 0
});

export default class TextInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			masking: this._formatNumber(props.value)
		};
	}

	componentDidUpdate(prevProps) {
		const { value: propsVal } = this.props;
		const { masking: stateVal } = this.state;

		if (this._cleanFormatted(stateVal) !== propsVal && propsVal !== null && propsVal !== undefined && prevProps.value !== propsVal) {
			let masking = propsVal !== 0 ? this._formatNumber(propsVal) : 0;
			this.setState({ masking });
		}
	}
	componentDidMount() {
		this.setState({
			masking: 0
		})
	}

	_formatNumber(data) {
		const { language = "idn" } = this.props;
		if (!data) return "";
		if (language === "idn") return idnFormatter.format(data);
		else return formatter.format(data);
	}

	_cleanFormatted(val) {
		const { language = "idn" } = this.props;
		let sentence = String(val);
		if (language === "idn") {
			sentence = sentence.replace(/\./g, "|");
			sentence = sentence.replace(/,/g, ".");
		}

		if (val !== 0) {
			const matches = Number(sentence.replace(/[^0-9.-]+/g, "")).toFixed(4);
			return isNaN(parseFloat(matches)) ? null : parseFloat(matches);
		}

		return null;
	}

	_onChange = evt => {
		const { onChange, name } = this.props;
		let cleanMaskingValue = { "value": this._cleanFormatted(evt.target.value), "name": name };
		onChange(cleanMaskingValue);
		this.setState({ masking: this._formatNumber(cleanMaskingValue["value"]) });
	};

	render() {
		const { masking } = this.state;
		const { className, md, name, placeholder } = this.props;
		console.log("--." + masking + "===" + placeholder);
		return <Input md={md} value={masking == 0 ? placeholder : masking} name={name} placeholder={placeholder} className={className} onChange={this._onChange} />;
	}
}
