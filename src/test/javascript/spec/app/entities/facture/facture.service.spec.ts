import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { take, map } from 'rxjs/operators';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { FactureService } from 'app/entities/facture/facture.service';
import { IFacture, Facture } from 'app/shared/model/facture.model';
import { StatutFacture } from 'app/shared/model/enumerations/statut-facture.model';
import { Mode } from 'app/shared/model/enumerations/mode.model';

describe('Service Tests', () => {
  describe('Facture Service', () => {
    let injector: TestBed;
    let service: FactureService;
    let httpMock: HttpTestingController;
    let elemDefault: IFacture;
    let expectedResult;
    let currentDate: moment.Moment;
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = {};
      injector = getTestBed();
      service = injector.get(FactureService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Facture('ID', 'AAAAAAA', currentDate, 'AAAAAAA', StatutFacture.PAYE, Mode.CARTE_DE_CREDIT, currentDate, 0);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            date: currentDate.format(DATE_TIME_FORMAT),
            datePaiement: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        service
          .find('123')
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: elemDefault });
      });

      it('should create a Facture', () => {
        const returnedFromService = Object.assign(
          {
            id: 'ID',
            date: currentDate.format(DATE_TIME_FORMAT),
            datePaiement: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date: currentDate,
            datePaiement: currentDate
          },
          returnedFromService
        );
        service
          .create(new Facture(null))
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should update a Facture', () => {
        const returnedFromService = Object.assign(
          {
            code: 'BBBBBB',
            date: currentDate.format(DATE_TIME_FORMAT),
            details: 'BBBBBB',
            statut: 'BBBBBB',
            modePaiement: 'BBBBBB',
            datePaiement: currentDate.format(DATE_TIME_FORMAT),
            motantPaiement: 1
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            date: currentDate,
            datePaiement: currentDate
          },
          returnedFromService
        );
        service
          .update(expected)
          .pipe(take(1))
          .subscribe(resp => (expectedResult = resp));
        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject({ body: expected });
      });

      it('should return a list of Facture', () => {
        const returnedFromService = Object.assign(
          {
            code: 'BBBBBB',
            date: currentDate.format(DATE_TIME_FORMAT),
            details: 'BBBBBB',
            statut: 'BBBBBB',
            modePaiement: 'BBBBBB',
            datePaiement: currentDate.format(DATE_TIME_FORMAT),
            motantPaiement: 1
          },
          elemDefault
        );
        const expected = Object.assign(
          {
            date: currentDate,
            datePaiement: currentDate
          },
          returnedFromService
        );
        service
          .query(expected)
          .pipe(
            take(1),
            map(resp => resp.body)
          )
          .subscribe(body => (expectedResult = body));
        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Facture', () => {
        service.delete('123').subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
