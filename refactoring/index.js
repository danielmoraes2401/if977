class Movie {

    static get CHILDREN() { return 2; }

    static get REGULAR() { return 0; }


    static get NEW_RELEASE() { return 1; }


    constructor(title, priceCode) {
        this._title = title;
        this._priceCode = priceCode;
    }


    get title() { return this._title; }


    get priceCode() { return this._priceCode; }

  
    set priceCode(priceCode) {
        this._priceCode = priceCode;
    }
}

class Rental {
 
    constructor(movie, daysRented) {
        this._movie = movie;
        this._daysRented = daysRented;
		
    }
	
	getCharge() {
		let thisAmount = 0;
	
		// Determine amounts for each line
		switch (rental.movie.priceCode) {
			case Movie.REGULAR:
				thisAmount += 2;
				if (rental.daysRented > 2) {
					thisAmount += (rental.daysRented - 2) * 1.5;
				}
				break;
			case Movie.NEW_RELEASE:
				thisAmount += rental.daysRented * 3;
				break;
			case Movie.CHILDREN:
				thisAmount += 1.5;
				if (rental.daysRented > 3) {
					thisAmount += (rental.daysRented - 3) * 1.5;
				}
				break;
		}
		
		return amount;
	
	   }
	
	getFrequentRenterPoints() {
		
            // add bonus for a two day new release rental
            if (this.movie.priceCode === Movie.NEW_RELEASE && this.daysRented > 1) {
                return 2;
			
            } else {
				
				return 1;
			}
	}


    get movie() { return this._movie; }


    get daysRented() { return this._daysRented; }
}

class Customer {

    constructor(name) {
        this._name = name;
        this._rentals = [];
    }


    get name() { return this._name; }


    get rentals() { return this._rentals; }


    addRental(rental) {
        this._rentals.push(rental);
    }

    statement() {
        
		
        let frequentRenterPoints = 0;

        let result = `Rental Record for ${this.name}\n`;

        for (let rental of this.rentals) {
            

            frequentRenterPoints = rental.getFrequentRenterPoints()

            //show figures for this rental
            result += `\t${rental.movie.title}\t${rental.getCharge()}\n`;
            totalAmount += rental.getCharge();
        }

        //add footer lines
        result += `Amount owed is ${this.getTotalCharge()}\nYou earned ${this.getTotalFrequentRenterPoints()} frequent renter points`;
        return result;
    }
	
	
	getTotalCharge(){
		let result = 0;
		
		for (let rental of this.rentals){
		result += rental.getCharge()
		}
		return result;
	}
		
		
		
	getTotalFrequentRenterPoints(){
		let result = 0;
		for (let rental of this.rentals){
		result += rental.getFrequentRenterPoints();
		}
		return result
	}
		
		
    }

function test() {
    const c = new Customer("Alice");

    const m1 = new Movie("Interstellar", Movie.CHILDREN);
    const m2 = new Movie("2001", Movie.REGULAR);
    const m3 = new Movie("Ad Astra", Movie.NEW_RELEASE);

    const r1 = new Rental(m1, 3);
    const r2 = new Rental(m2, 1);
    const r3 = new Rental(m3, 10);

    c.addRental(r1);
    c.addRental(r2);
    c.addRental(r3);

    const actualOutput = c.statement();

    const expectedOutput =
        `Rental Record for Alice\n` +
            `\tInterstellar\t1.5\n` +
            `\t2001\t2\n` +
            `\tAd Astra\t30\n` +
        `Amount owed is 33.5\nYou earned 4 frequent renter points`;

    const testPassed = expectedOutput === actualOutput;

    console.log(testPassed ? "Ok :)" : "Failed :(");

    if (!testPassed) {
        console.log(`Expected output:\n${expectedOutput}\n\n`);
        console.log(`Actual output:\n${actualOutput}\n`);
    }
}

test();
