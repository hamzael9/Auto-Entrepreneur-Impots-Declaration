var currentYear = new Date().getFullYear();
var currentMonth = new Date().getMonth() + 1;
currentMonth = 4;

console.log('Current Date : ' + currentMonth + ' - ' + currentYear );

function getCurrentTrimestre()
{
    var ret = 0;

    if ( currentMonth > 0 && currentMonth < 4 )
        ret = 1;
    else if (currentMonth >= 4 && currentMonth < 7 )
        ret = 2;
    else if ( currentMonth >= 7 && currentMonth < 10 )
        ret = 3;
    else if ( currentMonth >= 10 && currentMonth < 13 )
        ret = 4;
    else
        ret = -1; // Error

    return ret;
}

function CalculImpotLiberatoire(chiffreAffaire, taux)
{
    var ret = chiffreAffaire * taux ;
    return ret;
}

function CalculMoisDeRetard(trimestre, nbrAnnees)
{
    var currentTrimestre = getCurrentTrimestre();
    console.log('Current Trimestre : ' + currentTrimestre);

    var valid = ( currentTrimestre > trimestre ) || ( (currentTrimestre <= trimestre) && nbrAnnees > 0);

    if ( valid )
    {
        var nbrTrimestres = currentTrimestre - trimestre;
        var nbrMoisDansTrimestre = currentMonth - (3*(currentTrimestre-1));
        var nbrMoisEntreCurrentTrimestreEtTrimestreAPayer = ((currentTrimestre - trimestre - 1) * 3 ) + (nbrMoisDansTrimestre - 1);

        var nbrMoisDansLesAnnees = 12 * nbrAnnees;

        var ret =  nbrMoisEntreCurrentTrimestreEtTrimestreAPayer + nbrMoisDansLesAnnees;
    }
    else
    {
        ret = -1;
    }
    return ret;
}

// retourne objet avec proprietes ret.majoration, ret.penalite, ret.retard
function CalculPenaliteEtMajoration(impotLiberatoire, trimestre, nbrAnnees)
{
    var ret = { majoration : 0 , penalite : 0, retard : 0 };

    var monthsOfDelay = CalculMoisDeRetard(trimestre, nbrAnnees);

    console.log('\n\nmonths of delay :' + monthsOfDelay);

    if ( monthsOfDelay > 0 )
    {
        var retard = 0; 
        for ( var i = 0 ; i <= monthsOfDelay ; i++ )
        {
            if ( i == 2 )
            {
                ret.majoration = impotLiberatoire * 0.05;
                ret.penalite = impotLiberatoire * 0.05;
            }
            else if ( i == 3 )
            {
                ret.majoration = impotLiberatoire * 0.15;
                ret.penalite = impotLiberatoire * 0.1;
            }
            else if ( i == 4 )
            {
                retard = impotLiberatoire * 0.05;
            }
            else if ( i >= 5 )
            {
                retard += impotLiberatoire * 0.005;
    //            console.log('retard' +  ret.retard)
            }
        }
        ret.retard = retard;
    }
    else
    {
        console.log('-------> ERROR <-------- \n')
    }

    return ret;
}

function DisplayResults(impotLiberatoire, trimestre, nbrAnnees, penalites)
{
    console.log('DroitsDus pour le trimestre T' + trimestre + ' = ');
    console.log('\t Montant Impot Liberatoire = ' + impotLiberatoire );
    console.log('\t Penalite et majorations = ' );
    console.log('\t\t Majoration : ' + penalites.majoration);
    console.log('\t\t Penalite : ' + penalites.penalite);
    console.log('\t\t Retard : ' + penalites.retard);

    var totalDroitsDus = impotLiberatoire + penalites.majoration + penalites.penalite + penalites.retard;
    console.log('Total des droits dus : ' + totalDroitsDus );

}

// taux = 0.02 , trimestre = 1, annee = 2015
function CalculDroitsDus( chiffreAffaire, taux, trimestre, annee )
{
    var impotLiberatoire = CalculImpotLiberatoire(chiffreAffaire, taux);
    var nbrAnnees = currentYear - annee;
    var penalites = CalculPenaliteEtMajoration(impotLiberatoire, trimestre, nbrAnnees);

    DisplayResults(impotLiberatoire, trimestre, nbrAnnees, penalites);

}


CalculDroitsDus(10000,0.02,4,2016);
//console.log(CalculMoisDeRetard(1, 1) );
/*
CalculDroitsDus(25000, 0.02, '3', 2016);
CalculDroitsDus(31650, 0.02, '2', 2017);
CalculDroitsDus(16800, 0.02, '3', 2017);
CalculDroitsDus(8400, 0.02, '3', 2017);
*/