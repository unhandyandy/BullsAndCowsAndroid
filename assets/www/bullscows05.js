var numdigits = 2;

var wordlength = 2;

var symbols = [];

var scoreleftstr = "Human: 0";
var scorerightstr = "Computer 0";
var scorehuman = 0;
var scorecomputer = 0;

symbols[0] = "A";
symbols[1] = "B";
symbols[2] = "C";
symbols[3] = "D";
symbols[4] = "E";
symbols[5] = "M";
symbols[6] = "G";
symbols[7] = "H";
symbols[8] = "I";
symbols[9] = "K";

function showinstructions() {
    "use strict";
  alert("The computer thinks of a 'word' of the set length using the set number of letters.  You try to guess the computer's word.  For each correct letter in the correct location you score one bull; for each additional  correct letter in the wrong location you score one cow.  You score is indicated in the history below to the right of each guess: bulls first in white. then cows in yellow.");};

// function symbolmap(n) {
//     return "<img border='0' src='disk"+n+".png' alt=n width='24' height='22' />" }

function check(gss) {
    // document.write("checking...")
    // document.write("<br />")
  var guess = new Array();
  if (!gss) {
    guess = makerandword();
  }

  var newhistory = "\n";
  var i;
  for (var i=0;i<wordlength;i++)
  {
    var v;
      if (gss)
      {
	v = document.getElementById("guess"+i).value;
	//console.debug("v = %s, i = %s",v,i);
      }
      else{
	  v = guess[i];
      }
      //newhistory += symbols[v];
      if (gss)  {
	  guess[i] = parseFloat(v);
      }
  };
  newhistory += guess.map(function(k){
			      return symbols[k];
			  });
  //window.location.reload()
  var b = countbulls(guess);
  var w = countsame(guess) - b;

    globalguesser.updater(guess,b,w);

  //document.write(countsame(guess))
  historystr += "<br />"+newhistory+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class='bull'>"+b+"</span> <span class='cow'>"+w+"</span>";
  printhistory();
  var prescore = 0;
    if(globalguesser.scores[globalguesser.scores.length-1][0]==wordlength){
      prescore = globalguesser.length;
	historystr += "<br /><br />" + "You got it!" + "<br />" + "I did it this way:" + "<br />";
	printhistory();
	globalguesser.solve(true);
      printScore(prescore-globalguesser.length);
    };
};

function makeselector(name,cmd) {
  document.write("<select id='"+name+"' onchange='"+cmd+"' >");
  document.write("</select>"); }

function makeselectorstr(name,cmd) {
  return "<select id='"+name+"' onchange='"+cmd+"' width='2'></select>";}

function loadselector(m,n,name,sym) {
  var sel = document.getElementById(name);
  sel.options.length = 0;
	//document.write(m+", "+n)
  var i = 0;
    for (var i=m;i<=n;i++) {
      var newopt = new Option();
      newopt.value = i;
      newopt.text =  sym ? symbols[i] : i;
      sel.appendChild(newopt);}}



// function makeguessselector() {
//   var i = 0;
//   var htmlstr = "";
//     for (i=0;i<wordlength;i++) {
//       htmlstr += makeselectorstr("guess" + i,""); }
//   document.getElementById("playdiv").innerHTML = htmlstr;
//   loadguessselector(); }

function makeguessselectorstr() {
  var i = 0;
  var htmlstr = "";
    for (var i=0;i<wordlength;i++) {
      htmlstr += makeselectorstr("guess" + i,""); }
  return htmlstr;  }

function loadguessselector() {
  var i = 0;
    for (var i=0;i<wordlength;i++) {
      loadselector(0,numdigits - 1,"guess" + i,true)  ;     }}

var secret = new  Array();
//var secretstr = new  Array()

function makesecret() {
  secret = makerandword();  }

function makerandword() {
  var word = new Array;
  for (var i=0;i<wordlength;i++) {
    var rand = Math.floor(Math.random()*numdigits);
    word[i] = rand; }
  return word;
}


function newgame() {
  makesecret();
  makeplaypage();
  historystr = "History:";
  printhistory();
    globalguesser.reset();
}

var historystr = "History:";

function setNumDigits() {
  numdigits = document.getElementById("NumDigSelector").value;}

function setWordLength() {
  wordlength = document.getElementById("LengthSelector").value;}

function printhistory() {
  document.getElementById("historydiv").innerHTML = historystr ;}

function printScore(s){
  if(s<0){
    scorehuman += -s;
    scoreleftstr = "Human: "+scorehuman;
    document.getElementById("score-left").innerHTML = scoreleftstr;
  }
  else if(s>0){
        scorecomputer += s;
    scorerightstr = "Computer: "+scorecomputer;
    document.getElementById("score-right").innerHTML = scorerightstr;
  };
};

function makeplaypage() {
  var htmlstr = "";
  //htmlstr += ("<br />");
  htmlstr += ("<form>");
  htmlstr += ("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
  htmlstr += makeguessselectorstr();
  htmlstr += ("&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;");
  htmlstr += ("<input type='button' onclick='check(true)' value='Try Guess' />");
  htmlstr += ("<br /><br />");
  //htmlstr += ("<br /><br />");
  htmlstr += ("<input type='button' onclick='check(false)' value='Random Try' />");
  htmlstr += ("<br /><br />");
  htmlstr += ("</form>");
  document.getElementById("playdiv").innerHTML = htmlstr;
  loadguessselector();
    //printhistory()
    //document.close()
}

function countbulls(guess) {
  var cnt = 0;
    for (var i=0;i<wordlength;i++) {
      //console.debug("guess = %s, secret = %s",guess.join(),secret.join());
	if (guess[i]==secret[i]) {
	  cnt++;}}
  return cnt; }

function countsame(guess) {
    //document.write(guess)
  var cnt = 0;
  var sec = secret.slice();
    for (var i=0;i<wordlength;i++) {
      var ind = sec.indexOf(guess[i]);
	if (ind >= 0) {
	  cnt++;
	  delete sec[ind];
	}}
    //document.write(sec)
  return cnt; }


//   hypotheses ------------------

function hypo() {
    this.digs = Object.create( smallSet )
    this.locs = Object.create( smallSet )
    this.set = function(ds,ls) {
	this.digs = ds;
      this.locs = ls; };
    this.smaller = function(hp) {
      return (this.digs.subset(hp.digs) && this.locs.subset(hp.locs)); };
    this.larger = function(hp) {
      return hp.smaller(this); };
    this.equal = function(hp) {
      return (this.digs.equal(hp.digs) && this.locs.equal(hp.locs)); };
    this.compare = function(hp) {
	if (this.equal(hp)) {
	    return "equal"; }
	else if (this.smaller(hp)) {
	    return "smaller"; }
	else if (this.larger(hp)) {
	    return "larger"; }
	else {
	  return "incomens";}};
    this.resolve = function(hp) {
      //var res = new hypo();
	this.set(this.digs.inter(hp.digs),this.locs.inter(hp.locs));
      //return res;
    };
    this.consQ = function() {
      return !this.digs.emptyQ() && !this.locs.emptyQ(); };
    this.clone = function() {
	var res = new hypo();
	res.set(this.digs.clone(),this.locs.clone());
      return res; };
    this.peg = function(pg) {
	if (pg.score == 2) {
	    var pgdg = Object.create( smallSet );
	    pgdg.add(pg.dig);
	    var pglc = Object.create( smallSet );
	    pglc.add(pg.loc);
	    var pghp = new hypo();
	    pghp.set(pgdg,pglc);
	    this.resolve(pghp); }
	else if (pg.score == 1) {
	    this.locs.remove(pg.loc);
	    var pgdg = Object.create( smallSet );
	    pgdg.add(pg.dig);
	    this.digs = this.digs.inter(pgdg); }
	else {
	    this.digs.remove(pg.dig); }
    };
    this.breadth = function(){
	return this.digs.size()*this.locs.size();
    };
};

var testdigs1 = Object.create( smallSet );
testdigs1.addAll([1,2,4]);
var testdigs2 = Object.create( smallSet );
testdigs2.addAll([1,2,4,5]);
var testlocs1 = Object.create( smallSet );
testlocs1.addAll([2,3]);
var testlocs2 = Object.create( smallSet );
testlocs2.addAll([0,2,3]);
var testhypo1 = new hypo();
testhypo1.set(testdigs1,testlocs1);
var testhypo2 = new hypo();
testhypo2.set(testdigs2,testlocs2);


function peg(d,l,s) {
    this.score = s;
    this.loc = l;
    this.dig = d;
};

function makeU(n) {
    var res = Object.create( smallSet );
    for (var i=0;i<n;i++) {
	res.add(i); }
    return res; };

hypo.blank = function() {
    var newhypo = new hypo();
    newhypo.set(makeU(numdigits),makeU(wordlength));
  return newhypo; };

function cow(d,l) {
    this.dig = d;
    this.loc = l;
    this.equal = function(c){
	return this.dig == c.dig && this.loc == c.loc;
    };
    this.clone = function(){return new cow(this.dig,this.loc)};
};

function hypothesis() {
    this.hypos = [];
    var newhypo = hypo.blank();
    for (var i=0;i<wordlength;i++) {
	this.hypos[i] = newhypo.clone(); }
    this.cows = [];
    this.addcow = function(c){
	if(!this.cows.some(function(c2){return c.equal(c2);})){
	    this.cows.push(c);};
    };
    this.set = function(lst) {
      this.hypos = lst; };

    this.consQ = function(){
	return this.hypos.every(function(h){return h.consQ();});
    };

    this.clone = function() {
    var newhypos = [];
    var len = this.hypos.length;
    var res = new hypothesis();
    //console.debug("len = %s",len);
    if (len > 0) {
      for (var i=0;i<len;i++) {
	//console.debug("here comes this.hypos.clone: hypos[%s] = %s",i,this.hypos[i]);
	newhypos[i] = (this.hypos[i]).clone(); }
    };
    res.set(newhypos);
	res.cows = cloneList(this.cows);
    return res;
};

    this.match = function(hp) {
      var res = cloneList(this.hypos);
	var mapper = function(h) {
	  h.resolve(hp); };
	res.forEach(mapper);
      //return test.filter(function(h){return h.consQ();});
	return res; };

    this.resolve = function(hyp2,base) {
      if (hyp2.hypos.length == 0) {
	  base.checkcowgrps();
	  if(base.consQ()){
	      return [base];
	  }
	  else {
	      return [];
	  };
      };
      if (!base) {
	  base = new hypothesis();
	  base.set([]);
	  this.cows.forEach(function(c){base.addcow(c);});
	  hyp2.cows.forEach(function(c){base.addcow(c);});
        //console.debug("type of base: ",typeof(base));
      };
      //console.debug("type of base: ",typeof(base));
      var cur = hyp2.hypos.pop();
      var matches = this.match(cur);
      //console.debug("about to eval matches.length");
      var matlen = matches.length;
      //console.debug("matches.length = %s",matlen);
      //console.debug("matches[2] = %s",matches[2]);
      var matcons = matches.map(function(h){
	  return h.consQ();
      });
	if (matcons.reduce(logicalOr,false) == false) {
	    return []; };
	var res = [];
	for (var i=matlen-1;i>=0;i--) {
	    //console.debug("i = %s",i);
	    if (!matcons[i]){
		continue;
	}
	    //console.debug("here comes base.clone: base = %s",base);
	    var newbase = base.clone();
	    //console.debug("matches[%s]: %s",i,matches[i]);
	    newbase.hypos.push(matches[i]);
	    //console.debug("here comes this.clone:");
	    var newthis = this.clone();
	    newthis.hypos.splice(i,1);
	    res = res.concat(newthis.resolve(hyp2.clone(),newbase)); }
	res.sort(function(a,b){
		 return a.breadth() - b.breadth();});
	return res;
    };
  // this.checklocgrps = function(){
  //     var oldhypos = this.hypos.concat();
  //     var newhypos = [];
  //     while(oldhypos.length>0){
  // 	var dups = [oldhypos.pop()];
  // 	var curlocs = dups[0].locs;
  // 	  var i = oldhypos.length;
  // 	  while(i>0){
  // 	      i--;
  // 	      var cur = oldhypos[i];
  // 	      if(cur.locs.equal(curlocs)){
  // 		  oldhypos.splice(i,1);
  // 		  dups.push(cur);
  // 	      };
  // 	  };
  // 	var curlocslen = curlocs.size();
  // 	  if(curlocslen==dups.length){
  // 	    var cutfun = function(h){h.locs=h.locs.inter(curlocs.complement());};
  // 	      newhypos.forEach(cutfun);
  // 	      oldhypos.forEach(cutfun);
  // 	  }
  // 	  else if (curlocslen < dups.length){
  // 	    var cutfun = function(h){h.locs=Object.create( smallSet );};
  // 	      dups.forEach(cutfun);
  // 	  };
  // 	  newhypos = newhypos.concat(dups);
  //     };
  //     this.set(newhypos);
  // };
    this.grplocs = function(lst){
      var tmpss = Object.create( smallSet );
	var hps = this.hypos;
      lst.forEach(function(k){
	  tmpss = (hps[k]).locs.union(tmpss);
		  });
      return tmpss;
    };

    this.elim = function(lst){
      var elimlocs = this.grplocs(lst);
      for(var i=0;i<wordlength;i++){
	  if(lst.indexOf(i) == -1){
	  this.hypos[i].locs = this.hypos[i].locs.minus(elimlocs);
	};
      };
    };

      this.search = function(lst,j,cursize){
	  //console.debug("j = %s",j);
	  if((cursize > 0) && (cursize <= lst.length) && (lst.length < wordlength)){
	      return lst;}
	  else if ( (j >= wordlength) ||
		    (cursize > wordlength - j + lst.length) ){
	      return false;};
	  lst.push(j);
	  var tryit = this.search(lst,j+1,this.grplocs(lst).size());
	  if(tryit){return tryit;};
	  lst.pop();
	  return this.search(lst,j+1,cursize);
      };


    this.checklocgrps = function(lst,j,cursize){
	if(!lst){
	    var lst = [];};
	if(j===undefined){
	    var j = 0;};
	if(cursize===undefined){
	    var cursize = 0;};
      var grp = this.search(lst,j,cursize);
      //console.debug("grp = %s", grp);
      if(grp){
	  this.elim(grp);
	  var oldj = grp[0];
	  //console.debug("grp = %s",grp);
	  //console.debug("grp.length = %s",grp.length);
	  //console.debug("oldj = %s",oldj);
	  if( oldj + 1 == wordlength ){
	      return grp; }
	  else {
	      return this.checklocgrps([], oldj + 1,0);
	  };
      };
	return grp;
    };
  this.checkcowgrps = function(){
      for(var i=0;i<this.cows.length;i++){
	  var cur = this.cows[i];
	  var cursetdig = Object.create( smallSet );
	  cursetdig.add(cur.dig);
	  var cursetloc = Object.create( smallSet );
	  cursetloc.add(cur.loc);
	  for(var j=0;j<wordlength;j++){
	      var hyp = this.hypos[j];
	      if(cursetdig.equal(hyp.digs)){hyp.locs.remove(cur.loc);};
	      if(cursetloc.equal(hyp.locs)){hyp.digs.remove(cur.dig);};
	  };
      };
  };
    this.breadth = function(){
	if(this._breadth){
	    return this._breadth;
	};
	var res = 1;
	this.hypos.forEach(function(h){
			       res *= h.breadth();});
	this._breadth = res;
	return res;
    };
    this.checkcow = function(c){
	return this.cows.some(function(c2){
				  return c2.equal(c);
			      });
    };
    this.random = function(res,i,hyp){
	if(i===undefined){
	    var i=0;
	};
	if(!res){var res = [];};
	if(!hyp){
	    var hyp = this.clone();
	};

	if(!hyp.hypos[i]){
	    res.sort(function(a,b){
			 return a.loc - b.loc;
		     });
	    return res.map(function(c){
			       return c.dig;
			   });
	};
	var d = hyp.hypos[i].digs.randomElem();
	var l = hyp.hypos[i].locs.randomElem();
	var newcow = new cow(d,l);
	if(hyp.checkcow(newcow)){
	    return hyp.random(res,i,hyp);
	}
	else {
	    var newhyp = hyp.clone();
	    newhyp.hypos[i] = new hypo();
	    newhyp.hypos[i].digs.add(d);
	    newhyp.hypos[i].locs.add(l);
	    newhyp.checklocgrps();
	    if(newhyp.consQ()){
		res.push(newcow);
		return hyp.random(res,i+1,newhyp);
	    }
	    else {
		return hyp.random(res,i,hyp);
	    };
	};
    };
    this.checkLogic = function(){
	this.checklocgrps();
	this.checkcowgrps();
	this.checklocgrps();
    };
};

var testdigs3 = Object.create( smallSet );
testdigs3.addAll([0]);
var testdigs4 = Object.create( smallSet );
testdigs4.addAll([1]);
var testdigs5 = Object.create( smallSet );
testdigs5.addAll([0,1]);
var testlocs3 = Object.create( smallSet );
testlocs3.addAll([0,1]);
var testlocs4 = Object.create( smallSet );
testlocs4.addAll([0,1]);
var testlocs5 = Object.create( smallSet );
testlocs5.addAll([0]);
var testlocs6 = Object.create( smallSet );
testlocs6.addAll([1]);
var testhypo3 = new hypo();
testhypo3.set(testdigs3,testlocs3);
var testhypo4 = new hypo();
testhypo4.set(testdigs4,testlocs4);
var testhypo5 = new hypo();
testhypo5.set(testdigs3.clone(),testlocs5);
var testhypo6 = new hypo();
testhypo6.set(testdigs4.clone(),testlocs6);
var testhypo7 = new hypo();
testhypo7.set(testdigs4.clone(),testlocs4.clone());
var testhypoth1 = new hypothesis();
testhypoth1.set([testhypo3,testhypo4]);
var testhypoth2 = new hypothesis();
testhypoth2.set([testhypo5,testhypo6]);
var testhypoth3 = new hypothesis();
testhypoth3.set([testhypo7,testhypo6]);

hypothesis.fromPegs = function(lst){
    var p0s = lst.filter(function(p){
			   return p.score == 0;
		       });
    var p12s = lst.filter(function(p){
			      return p.score > 0;
			  });
    var res = new hypothesis();
    if (p0s.length > 0){
	var hyp0 = hypo.blank();
	for (var i=0;i<p0s.length;i++){
	    var p = p0s[i];
	    hyp0.peg(p);
	    res.addcow(new cow(p.dig,p.loc));
	};
	p0s = p0s.map(function(p){
			  return hyp0.clone();
		      });
    };
    var hyp1 = hypo.blank();

    for(var i=0;i<p12s.length;i++){
	var cln = hyp1.clone();
	var p = p12s[i];
	cln.peg(p);
	if(p.score == 1){
	    res.addcow(new cow(p.dig,p.loc));};
	p12s[i] = cln;
    };
    var reslst = p0s.concat(p12s);
    res.set(reslst);
    res.hypos.sort(function(a,b){
		 return b.breadth() - a.breadth();});
    return res;
};

var testpegs1 = [new peg(0,0,2),new peg(0,1,0)];
var testpegs2 = [new peg(1,0,1),new peg(2,1,0)];

var testpegs3 = [new peg(0,0,2),new peg(0,1,1),new peg(1,2,0)];
var testpegs4 = [new peg(0,0,2),new peg(1,1,0),new peg(2,2,1)];
var testpegs5 = [new peg(1,0,0),new peg(0,1,1),new peg(3,2,0)];

function makepegs(lst){
  var res = [];
  var i = 0;
  while(2*i+1 < lst.length){
    res[i] = new peg(lst[2*i],i,lst[2*i+1]);
    i++;
  };
  return res;
};

var testpegs6 = makepegs([0,2,0,2,0,0,1,1]);
var testpegs7 = makepegs([0,2,0,1,1,1,2,0]);
var testpegs8 = makepegs([0,2,1,2,0,2,3,0]);

function makepegslist(gs,bs,cs,zs,res){
    if(gs.length==0){
	return [res];
    };
    if(zs===undefined){
	var zs = gs.length - bs - cs;};
    if(!res){
	var res = [];
    };
    var curdig = gs.pop();
    var curloc = gs.length;
    var reslst = [];

    if(zs>0){
	var peg0 = new peg(curdig,curloc,0);
	var new0 = res.concat([peg0]);
	reslst = reslst.concat(makepegslist(gs.concat(),bs,cs,zs-1,new0));
    };

    if(cs>0){
	var peg1 = new peg(curdig,curloc,1);
	var new1 = res.concat([peg1]);
	reslst = reslst.concat(makepegslist(gs.concat(),bs,cs-1,zs,new1));
    };

    if(bs>0){
	var peg2 = new peg(curdig,curloc,2);
	var new2 = res.concat([peg2]);
 	reslst = reslst.concat(makepegslist(gs.concat(),bs-1,cs,zs,new2));
    };

    return reslst;
};

function guesser(){

    this.reset = function(){
	this.length = 0;
	this.guesses = [];
	this.scores = [];
	this.Hyps = [];
	this.curHyps = [new hypothesis()];
	this.thread = [];
    };

    this.reset();

    this.next = function(){
	var curhyp = this.curHyps.pop();
	var newguess = curhyp.random();
	//this.curHyps.push(curhyp);
	this.guesses.push(newguess);
	var b = countbulls(newguess);
	var c = countsame(newguess) - b;
	this.scores.push([b,c]);
	var newpeglists = makepegslist(newguess.concat(),b,c);
	var newhyplst = newpeglists.map(hypothesis.fromPegs);
	newhyplst.forEach(function(h){
			      h.checkLogic();});
	newhyplst.filter(function(h){
			     return h.consQ();});
	this.Hyps.push(newhyplst);
	this.length++;
	this.thread.push(0);

	var newhistory = newguess.map(function(k){return symbols[k];});
	historystr += "<br />"+newhistory.join()+"&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <span class='bull'>"+b+"</span> <span class='cow'>"+c+"</span>";
	printhistory();


	this.updateHyp(this.length - 1,curhyp);
    };

    this.updateHyp = function(ind,curhyp){
	    //console.debug("guesser length = %s",this.length);
	    //console.debug("curHyps length = %s",this.curHyps.length);
	    //console.debug("           ind = %s",ind);
	    //console.debug("");
	if(ind===undefined){
	    ind = this.length - 1;
	};
	if(!curhyp){
	    //console.debug("No curhyp!");
	    curhyp = this.curHyps.pop();
	};
	if(ind==this.length){
	    this.curHyps.push(curhyp);
	    return true;
	};
	var hypmodlst = this.Hyps[ind];
	var j = this.thread[ind];
	if(j===hypmodlst.length){
	    this.thread[ind-1]++;
	    this.resetthread(ind);
	    return this.updateHyp(ind-1,this.curHyps.pop());
	}
	var hypmod = hypmodlst[j];
	var nexthyplst = curhyp.resolve(hypmod.clone());
	if(nexthyplst.length == 0){
	    this.thread[ind]++;
	    this.resetthread(ind+1);
	    return this.updateHyp(ind,curhyp);
	}
	else{
	    var nexthyp = nexthyplst.pop();
	    nexthyp.checkLogic();
	    if(nexthyp.consQ()){
		this.curHyps.push(curhyp);
		this.resetthread(ind+1);
		//console.debug("about to recur");
		//console.debug("ind = %s", ind);
		//console.debug("");
		return this.updateHyp(ind+1,nexthyp);
	    }
	    else{
		this.thread[ind]++;
		this.resetthread(ind+1);
		return this.updateHyp(ind,curhyp);
	    };
	};
    };

    this.resetthread = function(i){
	for(var j=i;j<this.length;j++){
	    this.thread[j] = 0;
	};
    };

    this.solve = function(resetQ){
	if(!resetQ){
	    this.next();
	    if(this.scores[this.scores.length-1][0]!=wordlength){
		this.solve();
	    };
	}
	else{
	    this.reset();
	    this.solve();
	};
    };
    this.updater = function(g,b,c){
	this.guesses.push(g);
	this.scores.push([b,c]);
    	var newpeglists = makepegslist(g.concat(),b,c);
	var newhyplst = newpeglists.map(hypothesis.fromPegs);
	newhyplst.forEach(function(h){
			      h.checkLogic();});
	this.Hyps.push(newhyplst);
	this.length++;
	this.thread.push(0);
	this.updateHyp();
    };
    this.updateAll = function(i){
for(var j=i;j<this.length;j++){
    var s = this.scores[i];
    this.updater(this.guesses[j],s[0],s[1]);
};
    };
};

var globalguesser = new guesser();
