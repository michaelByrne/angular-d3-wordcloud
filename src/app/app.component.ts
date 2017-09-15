import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


class CloudConfig {
	constructor(
		public fontFace: string,
		public minFontSize: number,
		public maxFontSize: number,
		public spiral: string,
		public fontWeight: string,
		public rotationLow: number,
		public rotationHigh: number,
		public rotationNum: number,
		public padding: number
	) { }

}


@Component({
	selector: 'ngcloud-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

	rForm: FormGroup;
	numAngles: number;
	minFont: number = 10;
	maxFont: number = 60;
	padding: number = 1;
	cloudConfig = new CloudConfig(null, 10, 80, 'rectangular', null, -90, 90, 3, 1);

	words: any;

	wForm: FormGroup;
	wString: string;
	excludeList: string[] = ["and", "the", "to", "is", "but", "for", "he", "she", "they", "their", "that", "a", "it", "of", "with", "are", "has", "in"];



	defaultString = `The accounts of Killa Sin and the representatives of U-God and Method Man echo a tale circulating on hip-hop websites: Once Upon a Time in Shaolin began as an undertaking by Cilvaringz, who later persuaded RZA, the de facto leader of the Wu-Tang Clan, to endorse the project and make the record more valuable. (RZA and his representatives did not respond to interview requests.)

  This differs from the story given by RZA and Cilvaringz when they were auctioning the album through Paddle8, an online auction startup. The two men, who were identified during the auction as co-producers, described the album as an effort by the entire Clan to restore the value of music at a time when listeners can download almost any release without paying. They said members recorded their parts separately and that only the two producers had heard the entire finished product.

  Neris, who manages U-God, says the real story is that Cilvaringz gathered verses over the years from Clan members for his own projects and later stitched them together to make Once Upon a Time in Shaolin without the full group’s permission.

  `;

	constructor(private formBuilder: FormBuilder) {
		this.rForm = formBuilder.group({
			'numAngles': [3, Validators.required],
			'minFont': [15, Validators.required],
			'maxFont': [60, Validators.required],
			'padding': [1, Validators.required]
		});
		this.wForm = formBuilder.group({
			'wordListString': [null, Validators.required]
		})
		this.processWords(this.defaultString);

	}

	ngOnInit() {
		this.numAngles = 3;
	}

	updateCloud(post) {
		this.numAngles = post.numAngles;
		this.cloudConfig.minFontSize = post.minFont;
		this.cloudConfig.maxFontSize = post.maxFont;
		this.padding = post.padding;
		this.cloudConfig.rotationNum = this.numAngles;
		this.cloudConfig.padding = this.padding;
		//this.cloudConfig.spiral = post.spiral;
	}

	processWords(wordString) {
		let freq = this.wordFreq(wordString);
		this.words = freq;
	}

	newWordList(wordString) {
		this.wString = wordString.wordListString;
		this.processWords(wordString.wordListString);
	}

	buildWordList(minFont, maxFont, words) {
		this.words = words.map((d) =>
		{ return { text: d, size: minFont + Math.random() * maxFont } }
		);
	}

	wordFreq(string): any {
		let self = this;
		let yourFormat = [];
		let words = string.replace(/[^\w\s]|_/g, "")
			.replace(/\s+/g, " ").split(/\s/);
		let freqMap = new Map();
		words.forEach(function(w) {
			if (!self.excludeList.includes(w)) {
				if (!freqMap[w]) {
					freqMap[w] = 0;
				}
				freqMap[w] += 1;
			}
		});
		for (var w in freqMap) {
			let newWord = { "text": w, "size": freqMap[w] }
			yourFormat.push(newWord)
		};
		return yourFormat;
	}


}
