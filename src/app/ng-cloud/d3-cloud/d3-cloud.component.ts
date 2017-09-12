import { Component, Input, ElementRef, DoCheck, KeyValueDiffers } from '@angular/core';

import * as D3 from 'd3';

import { D3CloudService } from '../d3-cloud.service';

@Component({
	selector: 'd3-wordcloud',
	templateUrl: './d3-cloud.component.html',
	styleUrls: ['./d3-cloud.component.css']
})
export class D3CloudComponent implements DoCheck {

	@Input() words: Array<any>;
	@Input() config: any;

	private _host;              // D3 object referencing host DOM object
	private _svg;               // SVG in which we will print our chart
	private _margin: {          // Space between the svg borders and the actual chart graphic
		top: number,
		right: number,
		bottom: number,
		left: number
	};
	private _width: number;      // Component width
	private _height: number;     // Component height
	private _htmlElement: HTMLElement; // Host HTMLElement
	private _minCount: number;   // Minimum word count
	private _maxCount: number;   // Maximum word count
	private _fontScale;          // D3 scale for font size
	private _fillScale;          // D3 scale for text color
	private _objDifferConfig;
	private _objDifferWords;
	private _rotations: number[]; // Array of possible rotations (angles)

	constructor(private _element: ElementRef, private _keyValueDiffersConfig: KeyValueDiffers, private _keyValueDiffersWords: KeyValueDiffers, private cloudService: D3CloudService) {
		this._htmlElement = this._element.nativeElement; // Finds parent element for this directive
		this._host = D3.select(this._element.nativeElement); // Selects parent element as host element
		this._objDifferConfig = this._keyValueDiffersConfig.find([]).create(null);
		this._objDifferWords = this._keyValueDiffersWords.find([]).create(null);
	}

	ngDoCheck() {
		let changesConfig = this._objDifferConfig.diff(this.config);
		let changesWords = this._objDifferWords.diff(this.words);
		if (changesConfig || changesWords) {
			if (!this.config) {
				return;
			}
			this._setup();
			this._buildCloud();
		}
	}

	private _setup() {
		this._margin = {
			top: 10,
			right: 10,
			bottom: 10,
			left: 10
		};

		this._width = ((this._htmlElement.parentElement.parentElement.clientWidth == 0)
			? 300
			: this._htmlElement.parentElement.parentElement.clientWidth) - this._margin.left - this._margin.right;
		if (this._width < 100) {
			this._width = 100;
		}
		this._height = this._width * 0.75 - this._margin.top - this._margin.bottom;

		this._minCount = D3.min(this.words, d => d.size);
		this._maxCount = D3.max(this.words, d => d.size);

		let minFontSize: number = (this.config.minFontSize == null) ? 50 : this.config.minFontSize;
		let maxFontSize: number = (this.config.maxFontSize == null) ? 10 : this.config.maxFontSize;


		this._fontScale = D3.scaleSqrt()
			.domain([this._minCount, this._maxCount])
			.range([minFontSize, maxFontSize]);
		this._fillScale = D3.scaleOrdinal(D3.schemeCategory10);
		this._rotations = this._calculateRotationAngles(this.config.rotationLow, this.config.rotationHigh, this.config.rotationNum);
	}

	private _buildCloud() {
		let fontFace: string = (this.config.fontFace == null) ? 'Roboto' : this.config.fontFace;
		let fontWeight: string = (this.config.fontWeight == null) ? 'normal' : this.config.fontWeight;
		let spiralType: string = (this.config.spiral == null) ? 'rectangular' : this.config.spiral;

		// At this point we're basically writing normal D3 code
		this._host.html('');
		this._svg = this._host
			.append('svg')
			.attr('width', this._width + this._margin.left + this._margin.right)
			.attr('height', this._height + this._margin.top + this._margin.bottom)
			.append('g')
			.attr('transform', 'translate(' + ~~(this._width / 2) + ',' + ~~(this._height / 2) + ')')

		this.cloudService.size[0] = this._width;
		this.cloudService.size[1] = this._height;
		this.cloudService.start(this.words, this.config);
		this._drawWordCloud(this.words);

	}

	private _drawWordCloud(words) {
		this._svg
			.selectAll('text')
			.data(words)
			.enter()
			.append('text')
			.style('font-size', d => d.size + 'px')
			.style("font-family", "Impact")
			.style('fill', (d, i) => {
				return this._fillScale(i);
			})
			.attr('text-anchor', 'middle')
			.attr('transform', d => 'translate(' + [d.x, d.y] + ')rotate(' + d.rotate + ')')
			.attr('class', 'word-cloud')
			.text(d => {
				return d.text;
			});
	}

	private _calculateRotationAngles(low, high, num) {
		var diff = (high - low) / (num - 1);
		var rotations = [];

		var counter = 0;
		var current = low;
		while (counter < num) {
			rotations.push(current);
			current += diff;
			counter++;
		}
		return rotations;
	}



}
