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
        let totalAmount = 0;
        let frequentRenterPoints = 0;

        let result = `Rental Record for ${this.name}\n`;

        for (let rental of this.rentals) {
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

            frequentRenterPoints++;

            // add bonus for a two day new release rental
            if (rental.movie.priceCode === Movie.NEW_RELEASE && rental.daysRented > 1) {
                frequentRenterPoints++;
            }

            //show figures for this rental
            result += `\t${rental.movie.title}\t${thisAmount}\n`;
            totalAmount += thisAmount;
        }

        //add footer lines
        result += `Amount owed is ${totalAmount}\nYou earned ${frequentRenterPoints} frequent renter points`;
        return result;
    }
}
