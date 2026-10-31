(function () {
  // ====== EDITAR AQUI ======
  // Número que recebe os pedidos (só dígitos, com 55 + DDD) e Instagram. Ambos fictícios.
  var WHATSAPP = '5535900001234';
  var INSTAGRAM = 'liadoces';

  // Enquanto true, mostra o aviso de "preços de exemplo". Trocar pra false quando os preços forem confirmados.
  var PRECOS_DE_EXEMPLO = true;

  // Horário do forno (0 = domingo). [abre, fecha] em horas; null = fechado.
  var HORARIO = { 0: [9, 13], 1: null, 2: [9, 19], 3: [9, 19], 4: [9, 19], 5: [9, 19], 6: [9, 19] };

  // Montador de bolo
  var MONTE = {
    tamanho: [
      { id: '1kg', nome: '1 kg', info: 'serve ~10', serve: 10, preco: 90, camadas: 2, largura: 196 },
      { id: '2kg', nome: '2 kg', info: 'serve ~20', serve: 20, preco: 170, camadas: 3, largura: 236 },
      { id: '3kg', nome: '3 kg', info: 'serve ~30', serve: 30, preco: 250, camadas: 4, largura: 276 }
    ],
    massa: [
      { id: 'baunilha', nome: 'Baunilha', cor: '#f2d49b' },
      { id: 'chocolate', nome: 'Chocolate', cor: '#5a3418' },
      { id: 'red', nome: 'Red velvet', cor: '#a8273b', extra: 15 }
    ],
    recheio: [
      { id: 'ninho', nome: 'Ninho com morango', cor: 'url(#p-morango)', amostra: '#f6c7cf', topo: 'morango' },
      { id: 'brigadeiro', nome: 'Brigadeiro', cor: 'url(#p-granulado)', amostra: '#3b1f0e', topo: 'brigadeiro' },
      { id: 'prestigio', nome: 'Prestígio', cor: 'url(#p-coco)', amostra: '#fffaf2', topo: 'coco' },
      { id: 'nozes', nome: 'Doce de leite com nozes', cor: 'url(#p-nozes)', amostra: '#c98a3e', topo: 'noz', extra: 10 }
    ],
    cobertura: [
      { id: 'branco', nome: 'Chantininho branco', cor: '#fff6f0' },
      { id: 'rosa', nome: 'Chantininho rosa', cor: '#f9b6d1' },
      { id: 'ganache', nome: 'Ganache com calda', cor: '#4a2a12', extra: 10, calda: true }
    ]
  };

  var CATEGORIAS = [
    { id: 'bolos', nome: 'Bolos' },
    { id: 'individuais', nome: 'Fatias e potes' },
    { id: 'doces', nome: 'Docinhos' }
  ];

  // Preços e sabores de EXEMPLO.
  var PRODUTOS = [
    { id: 'bolo-decorado', categoria: 'bolos', nome: 'Bolo decorado', foto: 'destaque.jpg', selo: 'Sob encomenda',
      desc: 'Tema da festa, laço, escrita e confeitos. Conta a ideia no recado da sacola.',
      tamanhos: [{ nome: '2 kg (serve ~20)', preco: 220 }, { nome: '3 kg (serve ~30)', preco: 320 }],
      sabores: ['Ninho com morango', 'Brigadeiro', 'Prestígio', 'Doce de leite com nozes'] },
    { id: 'bolo-fatia', categoria: 'individuais', nome: 'Bolo fatia', foto: 'bolo-fatia.jpg', selo: 'Mais pedido',
      desc: 'A fatia alta, pra matar a vontade sem precisar de festa.', preco: 15,
      sabores: ['Ninho com morango', 'Brigadeiro', 'Red velvet'] },
    { id: 'bolo-pote', categoria: 'individuais', nome: 'Bolo de pote', foto: 'bolo-de-pote.jpg',
      desc: 'Camada de massa, camada de recheio, até a tampa.', preco: 14,
      sabores: ['Ninho com Nutella', 'Brigadeiro', 'Prestígio'] },
    { id: 'copo-tentacao', categoria: 'individuais', nome: 'Copo tentação', foto: 'copo-tentacao.jpg',
      desc: 'Creme, morango e chocolate em um copo difícil de dividir.', preco: 18 },
    { id: 'morango-amor', categoria: 'doces', nome: 'Morango do amor', foto: 'morango-do-amor.jpg', selo: 'Queridinho',
      desc: 'Morango com brigadeiro por dentro e casquinha vermelha que estala.', preco: 12 },
    { id: 'bombom', categoria: 'doces', nome: 'Bombom de morango', foto: 'bombom.jpg',
      desc: 'Pra presentear ou deixar a mesa da festa completa.',
      tamanhos: [{ nome: 'Unidade', preco: 6 }, { nome: 'Caixa com 6', preco: 32 }, { nome: 'Caixa com 12', preco: 60 }] }
  ];

  var CONVERSAS = [
    { nome: 'Mariana', txt: 'Lia, o bolo da Helena foi o assunto da festa. Sobrou zero!', hora: '22:14' },
    { nome: 'Carlos', txt: 'Pedi pelo site em 2 minutos, achei que ia ser complicado. Já tô vendo o de dezembro.', hora: '18:40' },
    { nome: 'Bruna', txt: 'Esse morango do amor deveria ser proibido. Passei aí 3x essa semana.', hora: '16:02' },
    { nome: 'Rafael', txt: 'Bolo de ninho com morango chegou perfeito, recheio de verdade. Obrigado!', hora: '20:31' },
    { nome: 'Juliana', txt: 'Mandei a foto de referência e ficou melhor que a foto. Sério.', hora: '11:47' },
    { nome: 'Dona Célia', txt: 'Minha neta pediu o mesmo bolo do ano passado. Isso diz tudo, né?', hora: '09:15' }
  ];
  // ====== FIM DA ÁREA DE EDIÇÃO ======

  var real = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
  var raiz = document.documentElement;
  var SVG = 'http://www.w3.org/2000/svg';
  raiz.classList.add('js');

  function $(s) { return document.querySelector(s); }
  function el(tag, attrs, filhos) {
    var n = document.createElement(tag);
    for (var k in attrs || {}) {
      if (k === 'text') n.textContent = attrs[k];
      else if (k.indexOf('on') === 0) n.addEventListener(k.slice(2), attrs[k]);
      else n.setAttribute(k, attrs[k]);
    }
    (filhos || []).forEach(function (f) { if (f) n.appendChild(typeof f === 'string' ? document.createTextNode(f) : f); });
    return n;
  }
  function svg(tag, attrs, pai) {
    var n = document.createElementNS(SVG, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (pai) pai.appendChild(n);
    return n;
  }
  function wa(texto) { return 'https://wa.me/' + WHATSAPP + (texto ? '?text=' + encodeURIComponent(texto) : ''); }
  function dataBR(iso) { return iso ? iso.split('-').reverse().join('/') : ''; }
  function avisar(txt) {
    var a = $('#aviso');
    a.textContent = txt;
    a.classList.add('mostra');
    clearTimeout(avisar.t);
    avisar.t = setTimeout(function () { a.classList.remove('mostra'); }, 2200);
  }

  // ---------- Movimento ----------
  var parado = false;
  try { parado = localStorage.getItem('lia-parado') === '1'; } catch (e) {}
  if (localStorage.getItem('lia-parado') === null && matchMedia('(prefers-reduced-motion: reduce)').matches) parado = true;
  function aplicarMovimento() {
    raiz.classList.toggle('parado', parado);
    $('#pausar').textContent = parado ? 'Ligar movimento' : 'Pausar movimento';
    $('#pausar').setAttribute('aria-pressed', parado);
  }
  $('#pausar').addEventListener('click', function () {
    parado = !parado;
    try { localStorage.setItem('lia-parado', parado ? '1' : '0'); } catch (e) {}
    aplicarMovimento();
  });
  aplicarMovimento();

  // ---------- Links de contato ----------
  ['#flutua-whats', '#rodape-whats'].forEach(function (s) { $(s).href = wa('Oi, Lia! Vim pelo site.'); });
  $('#final-btn').href = wa('Oi, Lia! Vim pelo site e quero encomendar um bolo.');
  $('#rodape-insta').href = 'https://instagram.com/' + INSTAGRAM;
  document.querySelectorAll('[data-exemplo]').forEach(function (n) { n.hidden = !PRECOS_DE_EXEMPLO; });

  // ---------- Topo ----------
  var topo = $('#topo');
  function aoRolar() { topo.classList.toggle('rolou', scrollY > 20); }
  addEventListener('scroll', aoRolar, { passive: true });
  aoRolar();

  (function forno() {
    var agora = new Date(), h = HORARIO[agora.getDay()], hora = agora.getHours() + agora.getMinutes() / 60;
    var aberto = h && hora >= h[0] && hora < h[1];
    $('#forno').classList.toggle('fechado', !aberto);
    $('#forno b').textContent = aberto ? 'Forno ligado' : 'Forno descansando';
  })();

  // ---------- Bolo do topo ----------
  var boloHero = $('#bolo-hero');
  var nomeBolo = $('#nome-bolo');

  function yFrente(x, cy, rx, ry) { var t = (x - 200) / rx; return cy + ry * Math.sqrt(Math.max(0, 1 - t * t)); }

  (function desenharBolo() {
    // calda escorrendo pela borda da frente
    var gotas = [14, 30, 10, 44, 20, 34, 12, 52, 18, 28, 40, 14, 24, 36];
    var d = 'M60 190', passo = 20;
    for (var i = 0; i < 14; i++) {
      var xa = 60 + i * passo, xm = xa + passo / 2, xb = xa + passo;
      var len = gotas[i];
      d += ' L' + (xm - 6) + ' ' + (yFrente(xm - 6, 190, 140, 26) + 4).toFixed(1);
      var yb = yFrente(xm, 190, 140, 26) + len;
      d += ' C' + (xm - 6) + ' ' + yb.toFixed(1) + ' ' + (xm + 6) + ' ' + yb.toFixed(1) + ' ' + (xm + 6) + ' ' + (yFrente(xm + 6, 190, 140, 26) + 4).toFixed(1);
      d += ' L' + xb + ' ' + (yFrente(xb, 190, 140, 26) + 4).toFixed(1);
    }
    d += ' L340 190 A140 26 0 0 0 60 190Z';
    $('#calda').setAttribute('d', d);

    // pérolas de glacê na base
    var perolas = $('#perolas');
    for (var x = 68; x <= 332; x += 13.2) svg('circle', { cx: x.toFixed(1), cy: (yFrente(x, 378, 140, 24) - 1).toFixed(1), r: 6 }, perolas);

    // chantilly e morangos em volta do topo: os de trás antes das velas, os da frente depois
    var tras = $('#cobertura');
    var frente = svg('g', {}, boloHero);
    for (var k = 0; k < 12; k++) {
      var ang = k / 12 * Math.PI * 2;
      var cx = 200 + Math.cos(ang) * 118, cy = 188 + Math.sin(ang) * 17;
      var g = svg('g', { transform: 'translate(' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ')' }, Math.sin(ang) < 0 ? tras : frente);
      if (k % 2 === 0) {
        svg('ellipse', { cx: 0, cy: 0, rx: 13, ry: 8, fill: '#fff7fb' }, g);
        svg('ellipse', { cx: 0, cy: -6, rx: 8, ry: 6, fill: '#fff' }, g);
        svg('path', { d: 'M-3 -10 Q0 -18 3 -10Z', fill: '#fff' }, g);
      } else {
        svg('path', { d: 'M0 4 C-11 0 -10 -13 0 -12 C10 -13 11 0 0 4Z', fill: '#e4374f' }, g);
        svg('path', { d: 'M-5 -11 L0 -15 L5 -11 L0 -9Z', fill: '#4f9a3c' }, g);
        svg('circle', { cx: -3, cy: -5, r: 1, fill: '#ffd6dc' }, g);
        svg('circle', { cx: 3, cy: -2, r: 1, fill: '#ffd6dc' }, g);
      }
    }
    // velas
    var velas = $('#velas');
    [172, 200, 228].forEach(function (vx, i) {
      var base = 186 - (i === 1 ? 6 : 0);
      var v = svg('g', { 'class': 'vela', role: 'button', tabindex: 0, 'aria-label': 'Soprar vela ' + (i + 1) }, velas);
      svg('circle', { 'class': 'luz', cx: vx, cy: base - 66, r: 26, fill: 'url(#g-luz)' }, v);
      for (var f = 0; f < 4; f++) svg('rect', { x: vx - 5, y: base - 52 + f * 13, width: 10, height: 13, fill: f % 2 ? '#ff9cc6' : '#fff7fb' }, v);
      svg('line', { x1: vx, y1: base - 52, x2: vx, y2: base - 58, stroke: '#3a2210', 'stroke-width': 1.5 }, v);
      svg('path', { 'class': 'chama', d: 'M' + vx + ' ' + (base - 80) + ' C' + (vx + 9) + ' ' + (base - 68) + ' ' + (vx + 7) + ' ' + (base - 57) + ' ' + vx + ' ' + (base - 57) + ' C' + (vx - 7) + ' ' + (base - 57) + ' ' + (vx - 9) + ' ' + (base - 68) + ' ' + vx + ' ' + (base - 80) + 'Z', fill: 'url(#g-chama)' }, v);
      svg('circle', { 'class': 'fumaca', cx: vx, cy: base - 66, r: 6, fill: '#cbb8c0' }, v);
      // área de toque maior
      svg('rect', { x: vx - 14, y: base - 90, width: 28, height: 92, fill: 'transparent' }, v);
    });
  })();

  function tamanhoNome(txt, max, largura) {
    return Math.min(max, largura / Math.max(3, txt.length * 0.56));
  }
  function escreverNome(nome) {
    var txt = nome || 'Parabéns!';
    nomeBolo.textContent = txt;
    nomeBolo.setAttribute('font-size', tamanhoNome(txt, 50, 250).toFixed(1));
    nomeBolo.classList.remove('escrevendo');
    void nomeBolo.getBBox();
    nomeBolo.classList.add('escrevendo');
  }
  escreverNome('');

  var nomeFesta = $('#nome-festa');
  var tEscrever;
  nomeFesta.addEventListener('input', function () {
    clearTimeout(tEscrever);
    tEscrever = setTimeout(function () { escreverNome(nomeFesta.value.trim()); }, 320);
    monteNome.value = nomeFesta.value;
    desenharCorte(false);
  });
  $('#form-nome').addEventListener('submit', function (e) {
    e.preventDefault();
    monteNome.value = nomeFesta.value.trim();
    desenharCorte(false);
    $('#monte').scrollIntoView({ behavior: parado ? 'auto' : 'smooth' });
  });

  // soprar velas
  function soprar(v) {
    if (v.classList.contains('apagada')) return;
    v.classList.add('apagada');
    var todas = boloHero.querySelectorAll('.vela');
    if (boloHero.querySelectorAll('.vela.apagada').length === todas.length) {
      var nome = nomeFesta.value.trim();
      avisar(nome ? 'Parabéns, ' + nome + '!' : 'Faz um pedido!');
      confete();
      setTimeout(function () { todas.forEach(function (x) { x.classList.remove('apagada'); }); }, 3200);
    }
  }
  boloHero.querySelectorAll('.vela').forEach(function (v) {
    v.addEventListener('click', function () { soprar(v); });
    v.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); soprar(v); } });
  });
  $('#dica-vela').addEventListener('click', function () {
    boloHero.querySelectorAll('.vela').forEach(function (v, i) { setTimeout(function () { soprar(v); }, i * 180); });
  });

  function confete() {
    if (parado || !document.body.animate) return;
    var r = boloHero.getBoundingClientRect();
    var cores = ['#ff9cc6', '#fddceb', '#ffcf6b', '#e4374f', '#fff4f8', '#7fd8a4'];
    for (var i = 0; i < 46; i++) {
      var c = el('span', { 'class': 'confete' });
      c.style.background = cores[i % cores.length];
      c.style.left = (r.left + r.width / 2) + 'px';
      c.style.top = (r.top + r.height * .3) + 'px';
      document.body.appendChild(c);
      var vx = (Math.random() - .5) * 520, vy = -180 - Math.random() * 260, giro = (Math.random() - .5) * 900;
      c.animate([
        { transform: 'translate(0,0) rotate(0)', opacity: 1 },
        { transform: 'translate(' + vx * .6 + 'px,' + vy + 'px) rotate(' + giro * .5 + 'deg)', opacity: 1, offset: .4 },
        { transform: 'translate(' + vx + 'px,' + (vy + 520) + 'px) rotate(' + giro + 'deg)', opacity: 0 }
      ], { duration: 1600 + Math.random() * 700, easing: 'cubic-bezier(.2,.6,.4,1)' }).onfinish = (function (n) { return function () { n.remove(); }; })(c);
    }
  }

  // ---------- Monte o seu ----------
  var escolha = { tamanho: '2kg', massa: 'chocolate', recheio: 'ninho', cobertura: 'rosa' };
  var monteNome = $('#monte-nome');
  var monteData = $('#monte-data');
  var hoje = new Date();
  var hojeISO = new Date(hoje.getTime() - hoje.getTimezoneOffset() * 6e4).toISOString().slice(0, 10);
  monteData.min = hojeISO;

  function opcao(grupo) { return MONTE[grupo].filter(function (o) { return o.id === escolha[grupo]; })[0]; }

  Object.keys(MONTE).forEach(function (grupo) {
    var alvo = document.querySelector('[data-grupo="' + grupo + '"]');
    MONTE[grupo].forEach(function (o) {
      var id = 'm-' + grupo + '-' + o.id;
      var input = el('input', { type: 'radio', name: grupo, id: id, value: o.id });
      if (escolha[grupo] === o.id) input.checked = true;
      input.addEventListener('change', function () { escolha[grupo] = o.id; desenharCorte(grupo === 'tamanho'); });
      var conteudo = [];
      if (o.cor || o.amostra) { var bola = el('i'); bola.style.background = o.amostra || o.cor; conteudo.push(bola); }
      conteudo.push(o.nome);
      if (o.info) conteudo.push(el('small', { text: o.info }));
      if (o.extra) conteudo.push(el('small', { text: '+' + real.format(o.extra) }));
      alvo.appendChild(el('div', { 'class': 'chip' }, [input, el('label', { 'for': id }, conteudo)]));
    });
  });

  function precoMonte() {
    return opcao('tamanho').preco + (opcao('massa').extra || 0) + (opcao('recheio').extra || 0) + (opcao('cobertura').extra || 0);
  }

  function desenharCorte(cair) {
    var t = opcao('tamanho'), m = opcao('massa'), r = opcao('recheio'), c = opcao('cobertura');
    var g = $('#camadas');
    g.textContent = '';
    var cx = 180, base = 334, hM = 36, hR = 14, borda = 7;
    var w = t.largura, x = cx - w / 2;
    var altura = (t.camadas + 1) * hM + t.camadas * hR;
    var topoY = base - altura;
    var atraso = 0;
    function grupo() {
      var n = svg('g', {}, g);
      if (cair && !parado) { n.setAttribute('class', 'camada'); n.style.animationDelay = (atraso += 70) + 'ms'; }
      return n;
    }
    // casca de cobertura (laterais e topo)
    svg('rect', { x: x - borda, y: topoY - borda - 6, width: w + borda * 2, height: altura + borda + 6, rx: 14, fill: c.cor }, grupo());
    // camadas de baixo pra cima
    var y = base;
    for (var i = 0; i < t.camadas * 2 + 1; i++) {
      var ehMassa = i % 2 === 0, h = ehMassa ? hM : hR;
      y -= h;
      var cam = grupo();
      svg('rect', { x: x, y: y, width: w, height: h, fill: ehMassa ? m.cor : r.cor, rx: i === t.camadas * 2 ? 6 : 0 }, cam);
      if (ehMassa) svg('rect', { x: x, y: y, width: w, height: 3, fill: '#fff', opacity: .12 }, cam);
    }
    // calda escorrendo
    var topoG = grupo();
    if (c.calda) {
      [[-1, 0, 30], [-1, 1, 54], [1, 0, 40], [1, 1, 22]].forEach(function (p) {
        var lx = p[0] < 0 ? x - borda : x + w + borda - 9;
        svg('rect', { x: lx + p[1] * 0, y: topoY - 10, width: 9, height: p[2] + p[1] * 10, rx: 4.5, fill: c.cor }, topoG);
      });
    }
    // decoração do topo
    var n = t.camadas + 3, passo = w / n;
    for (var k = 0; k < n; k++) {
      var dx = x + passo * (k + .5), dy = topoY - borda - 6;
      if (k % 2 === 0) {
        var cor = c.id === 'ganache' ? '#6b4518' : c.cor;
        svg('ellipse', { cx: dx, cy: dy, rx: 12, ry: 8, fill: cor }, topoG);
        svg('ellipse', { cx: dx, cy: dy - 7, rx: 7, ry: 6, fill: cor }, topoG);
        svg('path', { d: 'M' + (dx - 3) + ' ' + (dy - 11) + ' Q' + dx + ' ' + (dy - 19) + ' ' + (dx + 3) + ' ' + (dy - 11) + 'Z', fill: cor }, topoG);
      } else {
        var item = svg('g', { transform: 'translate(' + dx + ' ' + (dy - 4) + ')' }, topoG);
        if (r.topo === 'morango') {
          svg('path', { d: 'M0 6 C-11 2 -10 -11 0 -10 C10 -11 11 2 0 6Z', fill: '#e4374f' }, item);
          svg('path', { d: 'M-5 -9 L0 -13 L5 -9 L0 -7Z', fill: '#4f9a3c' }, item);
        } else if (r.topo === 'brigadeiro') {
          svg('circle', { r: 9, fill: '#3b1f0e' }, item);
          [[-4, -3], [3, -5], [5, 2], [-2, 4], [0, -1]].forEach(function (p) { svg('rect', { x: p[0], y: p[1], width: 3, height: 1.4, rx: .7, fill: '#1d0e05' }, item); });
        } else if (r.topo === 'coco') {
          svg('circle', { r: 9, fill: '#fffaf2' }, item);
          svg('path', { d: 'M-5 -2h4M1 3h4M-2 -6h3', stroke: '#d9cbb6', 'stroke-width': 1.4, 'stroke-linecap': 'round' }, item);
        } else {
          svg('ellipse', { rx: 9, ry: 7, fill: '#8d5a26' }, item);
          svg('path', { d: 'M-6 0 Q0 -5 6 0 M-5 3 Q0 -1 5 3', stroke: '#5e3a14', 'stroke-width': 1.3, fill: 'none' }, item);
        }
      }
    }
    // topo de bolo com o nome
    var nome = monteNome.value.trim();
    if (nome) {
      var tg = grupo();
      var ty = topoY - borda - 26;
      var fs = tamanhoNome(nome, 34, Math.min(w, 260));
      svg('line', { x1: cx - 30, y1: ty + 4, x2: cx - 30, y2: ty + 26, stroke: '#ffcf6b', 'stroke-width': 2.5 }, tg);
      svg('line', { x1: cx + 30, y1: ty + 4, x2: cx + 30, y2: ty + 26, stroke: '#ffcf6b', 'stroke-width': 2.5 }, tg);
      var txt = svg('text', { x: cx, y: ty, 'text-anchor': 'middle', 'font-size': fs.toFixed(1), fill: '#ffcf6b', stroke: '#6b4518', 'stroke-width': 4, 'paint-order': 'stroke', 'stroke-linejoin': 'round' }, tg);
      txt.textContent = nome;
    }
    $('#monte-total').textContent = real.format(precoMonte());
    $('#monte-serve').textContent = t.info.replace('~', 'umas ') + ' pessoas · ' + m.nome.toLowerCase() + ' com ' + r.nome.toLowerCase();
  }
  monteNome.addEventListener('input', function () { desenharCorte(false); });
  desenharCorte(true);

  function resumoMonte() {
    var t = opcao('tamanho');
    return {
      linhas: [
        '*Tamanho:* ' + t.nome + ' (' + t.info + ')',
        '*Massa:* ' + opcao('massa').nome,
        '*Recheio:* ' + opcao('recheio').nome,
        '*Cobertura:* ' + opcao('cobertura').nome
      ].concat(monteNome.value.trim() ? ['*Escrito no bolo:* ' + monteNome.value.trim()] : [])
        .concat(monteData.value ? ['*Pra quando:* ' + dataBR(monteData.value)] : []),
      detalhe: [t.nome, opcao('massa').nome, opcao('recheio').nome, opcao('cobertura').nome].join(' · ') +
        (monteNome.value.trim() ? ' · escrito "' + monteNome.value.trim() + '"' : '')
    };
  }

  $('#monte-whats').addEventListener('click', function () {
    var r = resumoMonte();
    var txt = ['Oi, Lia! Montei um bolo pelo site:', ''].concat(r.linhas, ['', 'Valor no site: ' + real.format(precoMonte())]).join('\n');
    window.open(wa(txt), '_blank', 'noopener');
  });
  $('#monte-sacola').addEventListener('click', function () {
    var r = resumoMonte();
    adicionar({ chave: 'monte|' + r.detalhe, nome: 'Bolo montado', detalhe: r.detalhe, preco: precoMonte(), qtd: 1 });
    if (monteData.value && !$('#cliente-data').value) $('#cliente-data').value = monteData.value;
    avisar('Bolo na sacola');
  });

  // ---------- Cardápio ----------
  function precoDe(p, tamanho) {
    if (!p.tamanhos) return p.preco;
    var t = p.tamanhos.filter(function (x) { return x.nome === tamanho; })[0];
    return (t || p.tamanhos[0]).preco;
  }

  function seletor(rotulo, opcoes, aoMudar) {
    var s = el('select', { 'aria-label': rotulo, onchange: aoMudar });
    opcoes.forEach(function (o) { s.appendChild(el('option', { value: o, text: rotulo + ': ' + o })); });
    return s;
  }

  function card(p) {
    var qtd = 1, tam, sab;
    var precoEl = el('span', { 'class': 'preco' });
    function atualiza() { precoEl.textContent = real.format(precoDe(p, tam && tam.value)); }
    if (p.tamanhos) tam = seletor('Tamanho', p.tamanhos.map(function (t) { return t.nome; }), atualiza);
    if (p.sabores) sab = seletor('Sabor', p.sabores, atualiza);
    var num = el('span', { text: '1' });
    var add = el('button', { 'class': 'add', type: 'button', text: 'Pôr na sacola' });
    add.addEventListener('click', function () {
      var t = tam && tam.value, s = sab && sab.value;
      var detalhe = [t, s].filter(Boolean).join(' · ');
      adicionar({ chave: [p.id, t || '', s || ''].join('|'), nome: p.nome, detalhe: detalhe, preco: precoDe(p, t), qtd: qtd });
      add.textContent = 'Na sacola ✓'; add.classList.add('ok');
      setTimeout(function () { add.textContent = 'Pôr na sacola'; add.classList.remove('ok'); }, 1300);
      qtd = 1; num.textContent = '1';
    });
    var img = el('img', { src: 'assets/produtos/' + p.foto, alt: p.nome, loading: 'lazy' });
    var c = el('article', { 'class': 'card revela', 'data-cat': p.categoria }, [
      el('div', { 'class': 'card-foto' }, [img, p.selo ? el('span', { 'class': 'selo', text: p.selo }) : null]),
      el('div', { 'class': 'card-info' }, [
        el('div', { 'class': 'card-topo' }, [el('h3', { text: p.nome }), precoEl]),
        el('p', { 'class': 'desc', text: p.desc }),
        tam, sab,
        el('div', { 'class': 'comprar' }, [
          el('div', { 'class': 'qtd' }, [
            el('button', { type: 'button', 'aria-label': 'Diminuir', text: '−', onclick: function () { if (qtd > 1) num.textContent = --qtd; } }),
            num,
            el('button', { type: 'button', 'aria-label': 'Aumentar', text: '+', onclick: function () { num.textContent = ++qtd; } })
          ]),
          add
        ])
      ])
    ]);
    // inclinação leve no hover (só mouse)
    c.addEventListener('pointermove', function (e) {
      if (parado || e.pointerType !== 'mouse') return;
      var r = c.getBoundingClientRect();
      var px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      c.style.transform = 'perspective(900px) rotateY(' + px * 6 + 'deg) rotateX(' + -py * 6 + 'deg) translateY(-4px)';
    });
    c.addEventListener('pointerleave', function () { c.style.transform = ''; });
    atualiza();
    return c;
  }

  (function montarCardapio() {
    var grade = $('#grade'), filtros = $('#filtros'), botoes = [];
    PRODUTOS.forEach(function (p) { grade.appendChild(card(p)); });
    function filtrar(id) {
      botoes.forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.cat === id)); });
      grade.querySelectorAll('.card').forEach(function (c) { c.hidden = id !== 'todos' && c.dataset.cat !== id; });
    }
    [{ id: 'todos', nome: 'Tudo' }].concat(CATEGORIAS).forEach(function (c) {
      var b = el('button', { 'class': 'filtro', type: 'button', 'data-cat': c.id, text: c.nome, onclick: function () { filtrar(c.id); } });
      botoes.push(b); filtros.appendChild(b);
    });
    filtrar('todos');
  })();

  // ---------- Sacola ----------
  var sacola = [];
  try { sacola = JSON.parse(localStorage.getItem('lia-sacola-v2')) || []; } catch (e) {}
  function guardar() { try { localStorage.setItem('lia-sacola-v2', JSON.stringify(sacola)); } catch (e) {} }
  function total() { return sacola.reduce(function (s, i) { return s + i.preco * i.qtd; }, 0); }
  function qtdTotal() { return sacola.reduce(function (s, i) { return s + i.qtd; }, 0); }

  function adicionar(item) {
    var existente = sacola.filter(function (i) { return i.chave === item.chave; })[0];
    if (existente) existente.qtd += item.qtd; else sacola.push(item);
    guardar(); render();
    var ct = $('#contador'); ct.classList.remove('pula'); void ct.offsetWidth; ct.classList.add('pula');
  }
  function mudarQtd(idx, d) {
    sacola[idx].qtd += d;
    if (sacola[idx].qtd < 1) sacola.splice(idx, 1);
    guardar(); render();
  }

  function render() {
    var n = qtdTotal();
    $('#contador').textContent = n; $('#contador').hidden = !n;
    $('#gaveta-total').textContent = real.format(total());
    $('#flutua-total').textContent = real.format(total());
    $('#flutua-qtd').textContent = n;
    $('#enviar').disabled = !n;
    atualizarFlutuantes();
    var lista = $('#itens');
    lista.textContent = '';
    if (!n) { lista.appendChild(el('p', { 'class': 'vazio', text: 'Sua sacola tá vazia. Monta um bolo ou escolhe um doce.' })); return; }
    sacola.forEach(function (i, idx) {
      lista.appendChild(el('div', { 'class': 'item' }, [
        el('div', { 'class': 'item-topo' }, [
          el('div', {}, [el('strong', { text: i.nome }), i.detalhe ? el('small', { text: i.detalhe }) : null]),
          el('strong', { text: real.format(i.preco * i.qtd) })
        ]),
        el('div', { 'class': 'item-baixo' }, [
          el('div', { 'class': 'qtd' }, [
            el('button', { type: 'button', 'aria-label': 'Diminuir', text: '−', onclick: function () { mudarQtd(idx, -1); } }),
            el('span', { text: String(i.qtd) }),
            el('button', { type: 'button', 'aria-label': 'Aumentar', text: '+', onclick: function () { mudarQtd(idx, 1); } })
          ]),
          el('button', { 'class': 'remover', type: 'button', text: 'Remover', onclick: function () { sacola.splice(idx, 1); guardar(); render(); } })
        ])
      ]));
    });
  }

  var gavetaAberta = false;
  function abrir(sim) {
    gavetaAberta = sim;
    $('#gaveta').classList.toggle('aberta', sim);
    $('#gaveta').setAttribute('aria-hidden', String(!sim));
    $('#fundo').classList.toggle('aberto', sim);
    document.body.classList.toggle('travado', sim);
    atualizarFlutuantes();
    if (sim) setTimeout(function () { $('#fechar').focus(); }, 50);
  }
  $('#sacola-topo').addEventListener('click', function () { abrir(true); });
  $('#flutua-sacola').addEventListener('click', function () { abrir(true); });
  $('#fechar').addEventListener('click', function () { abrir(false); });
  $('#fundo').addEventListener('click', function () { abrir(false); });
  addEventListener('keydown', function (e) { if (e.key === 'Escape' && gavetaAberta) abrir(false); });
  $('#cliente-data').min = hojeISO;

  $('#enviar').addEventListener('click', function () {
    var nome = $('#cliente-nome').value.trim(), data = $('#cliente-data').value, obs = $('#cliente-obs').value.trim();
    var l = ['Oi, Lia! Quero fazer um pedido pelo site:', ''];
    sacola.forEach(function (i) { l.push('• ' + i.qtd + 'x *' + i.nome + '*' + (i.detalhe ? ' (' + i.detalhe + ')' : '') + ' — ' + real.format(i.preco * i.qtd)); });
    l.push('', '*Total estimado:* ' + real.format(total()));
    if (nome) l.push('*Nome:* ' + nome);
    if (data) l.push('*Pra quando:* ' + dataBR(data));
    if (obs) l.push('*Recado:* ' + obs);
    l.push('Retirada na loja.');
    window.open(wa(l.join('\n')), '_blank', 'noopener');
  });

  // ---------- Botão fixo: some quando já tem outro botão de chamar na tela ----------
  var ctasVisiveis = new Set();
  function atualizarFlutuantes() {
    var temSacola = qtdTotal() > 0;
    $('#flutua-sacola').hidden = !temSacola;
    $('#flutua-sacola').classList.toggle('some', gavetaAberta);
    $('#flutua-whats').classList.toggle('some', temSacola || gavetaAberta || ctasVisiveis.size > 0);
  }
  if ('IntersectionObserver' in window) {
    var ioCta = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) ctasVisiveis.add(e.target); else ctasVisiveis.delete(e.target); });
      atualizarFlutuantes();
    });
    document.querySelectorAll('[data-cta], .rodape').forEach(function (n) { ioCta.observe(n); });
  }

  // ---------- Datas especiais (atualiza sozinho) ----------
  function pascoa(ano) {
    var a = ano % 19, b = Math.floor(ano / 100), c = ano % 100, d = Math.floor(b / 4), e = b % 4,
      f = Math.floor((b + 8) / 25), g = Math.floor((b - f + 1) / 3), h = (19 * a + b - d - g + 15) % 30,
      i = Math.floor(c / 4), k = c % 4, l = (32 + 2 * e + 2 * i - h - k) % 7, m = Math.floor((a + 11 * h + 22 * l) / 451),
      mes = Math.floor((h + l - 7 * m + 114) / 31), dia = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(ano, mes - 1, dia);
  }
  function domingo(ano, mes, n) {
    var d = new Date(ano, mes, 1);
    d.setDate(1 + (7 - d.getDay()) % 7 + (n - 1) * 7);
    return d;
  }
  var DATAS = [
    { nome: 'Páscoa', pra: 'pra Páscoa', quando: pascoa, titulo: 'A Páscoa tá chegando.', desc: 'Ovo de colher, ovo trufado e cesta de presente. Encomendas com até 10 dias de antecedência.' },
    { nome: 'Dia das Mães', pra: 'pro Dia das Mães', quando: function (a) { return domingo(a, 4, 2); }, titulo: 'Dia das Mães, com bolo.', desc: 'Bolo com mensagem, caixa de bombons e cesta de café da manhã pra ela.' },
    { nome: 'Namorados', pra: 'pro Dia dos Namorados', quando: function (a) { return new Date(a, 5, 12); }, titulo: 'Dia dos Namorados sem clichê.', desc: 'Morango do amor (claro), caixa de bombons e bolo pra dois.' },
    { nome: 'Dia dos Pais', pra: 'pro Dia dos Pais', quando: function (a) { return domingo(a, 7, 2); }, titulo: 'Dia dos Pais tem bolo.', desc: 'Bolo de chocolate do jeito que pai gosta, sem economizar no recheio.' },
    { nome: 'Dia das Crianças', pra: 'pro Dia das Crianças', quando: function (a) { return new Date(a, 9, 12); }, titulo: 'Dia das Crianças é dia de doce.', desc: 'Kit de docinhos, bolo de pote e copinhos coloridos.' },
    { nome: 'Natal', pra: 'pro Natal', quando: function (a) { return new Date(a, 11, 25); }, titulo: 'O Natal tá chegando.', desc: 'Panetone recheado, bolo de Natal e caixa de bombons pra presentear. As encomendas fecham dia 20/12.' }
  ];
  (function proximasDatas() {
    var zero = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate());
    var lista = [];
    [hoje.getFullYear(), hoje.getFullYear() + 1].forEach(function (ano) {
      DATAS.forEach(function (d) { var q = d.quando(ano); if (q >= zero) lista.push({ d: d, q: q }); });
    });
    lista.sort(function (a, b) { return a.q - b.q; });
    var prox = lista[0], dias = Math.round((prox.q - zero) / 864e5);
    $('#datas-dias').textContent = dias;
    $('#datas-rotulo').textContent = dias === 0 ? 'é hoje!' : (dias === 1 ? 'dia ' : 'dias ') + prox.d.pra;
    $('#datas-titulo').textContent = prox.d.titulo;
    $('#datas-desc').textContent = prox.d.desc;
    $('#datas-btn').href = wa('Oi, Lia! Quero fazer uma encomenda ' + prox.d.pra + '.');
    var ul = $('#datas-lista');
    lista.slice(0, 5).forEach(function (x, i) {
      ul.appendChild(el('li', { 'class': i === 0 ? 'agora' : '' }, [el('b', { text: x.d.nome }), x.q.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' }).replace('.', '')]));
    });
  })();

  // ---------- Depoimentos ----------
  (function conversas() {
    var trilho = $('#conversas');
    CONVERSAS.concat(CONVERSAS).forEach(function (c, i) {
      var z = el('div', { 'class': 'zap' }, [
        el('div', { 'class': 'zap-quem' }, [el('i', { text: c.nome.replace('Dona ', '').charAt(0) }), c.nome]),
        el('p', { text: c.txt }),
        el('time', { text: c.hora })
      ]);
      if (i >= CONVERSAS.length) z.setAttribute('aria-hidden', 'true');
      trilho.appendChild(z);
    });
  })();

  // ---------- Entrada das seções, frase que acende e números ----------
  var frase = $('#frase');
  frase.innerHTML = frase.textContent.split(' ').map(function (p) { return '<span class="p">' + p + '</span>'; }).join(' ');
  var palavras = frase.querySelectorAll('.p');
  function acenderFrase() {
    var r = frase.getBoundingClientRect();
    var prog = Math.min(1, Math.max(0, (innerHeight * .85 - r.top) / (r.height + innerHeight * .35)));
    var ate = Math.round(prog * palavras.length);
    palavras.forEach(function (p, i) { p.classList.toggle('acesa', i < ate); });
  }
  addEventListener('scroll', acenderFrase, { passive: true });
  acenderFrase();

  function contar(dt) {
    var alvo = parseFloat(dt.dataset.conta), dec = 'dec' in dt.dataset, mais = 'mais' in dt.dataset;
    function fmt(v) { return (mais ? '+' : '') + (dec ? v.toFixed(1).replace('.', ',') : Math.round(v).toLocaleString('pt-BR')); }
    if (parado) { dt.textContent = fmt(alvo); return; }
    var ini = performance.now(), dur = 1400;
    (function passo(t) {
      var p = Math.min(1, (t - ini) / dur), e = 1 - Math.pow(1 - p, 3);
      dt.textContent = fmt(alvo * e);
      if (p < 1) requestAnimationFrame(passo);
    })(ini);
  }

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add('visto');
        e.target.querySelectorAll('[data-conta]').forEach(contar);
        io.unobserve(e.target);
      });
    }, { threshold: .15, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.revela').forEach(function (n) { io.observe(n); });
  } else {
    document.querySelectorAll('.revela').forEach(function (n) { n.classList.add('visto'); });
  }

  render();
})();
