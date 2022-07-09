import{_ as s,c as n,o as a,a as e}from"./app.03a226b6.js";const b=JSON.parse('{"title":"Getting Started","description":"","frontmatter":{},"headers":[{"level":2,"title":"Install dependencies","slug":"install-dependencies"},{"level":2,"title":"Define an exposition","slug":"define-an-exposition"},{"level":2,"title":"Connect to an integration","slug":"connect-to-an-integration"}],"relativePath":"getting-started.md","lastUpdated":1657373321000}'),l={name:"getting-started.md"},t=e(`<h1 id="getting-started" tabindex="-1">Getting Started <a class="header-anchor" href="#getting-started" aria-hidden="true">#</a></h1><div class="warning custom-block"><p class="custom-block-title">\u26A0\uFE0F This library is still in active development!</p><p>I&#39;ve just added the docs to get a better feeling for the maximum amount of information that need to be put into TSDoc. And start working on examples later on.</p></div><h2 id="install-dependencies" tabindex="-1">Install dependencies <a class="header-anchor" href="#install-dependencies" aria-hidden="true">#</a></h2><p>Here are three commands for the most used package managers.<br><em>I&#39;ll be biased and promote my favorite one first.</em></p><div class="language-sh line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#ABB2BF;">pnpm add -D @exposition/core</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><div class="language-sh line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#ABB2BF;">yarn add -D @exposition/core</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><div class="language-sh line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#ABB2BF;">npm install -D @exposition/core</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br></div></div><h2 id="define-an-exposition" tabindex="-1">Define an exposition <a class="header-anchor" href="#define-an-exposition" aria-hidden="true">#</a></h2><p>Create an Exposition with all necessary data \u{1F52E}</p><div class="language-ts line-numbers-mode"><span class="copy"></span><pre><code><span class="line"><span style="color:#C678DD;">import</span><span style="color:#ABB2BF;"> { </span><span style="color:#E06C75;">createExposition</span><span style="color:#ABB2BF;"> } </span><span style="color:#C678DD;">from</span><span style="color:#ABB2BF;"> </span><span style="color:#98C379;">&#39;exposition&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;"> </span><span style="color:#E5C07B;">exposition</span><span style="color:#ABB2BF;"> </span><span style="color:#56B6C2;">=</span><span style="color:#ABB2BF;"> </span><span style="color:#61AFEF;">createExposition</span><span style="color:#ABB2BF;">({</span></span>
<span class="line"><span style="color:#ABB2BF;">  </span><span style="color:#E06C75;">auth</span><span style="color:#ABB2BF;">: {</span></span>
<span class="line"><span style="color:#ABB2BF;">    </span><span style="color:#E06C75;">options</span><span style="color:#ABB2BF;">: [</span><span style="color:#98C379;">&#39;valid \u2705&#39;</span><span style="color:#ABB2BF;">, </span><span style="color:#98C379;">&#39;deny \u274C&#39;</span><span style="color:#ABB2BF;">]</span></span>
<span class="line"><span style="color:#ABB2BF;">  }</span></span>
<span class="line"><span style="color:#ABB2BF;">} </span><span style="color:#C678DD;">as</span><span style="color:#ABB2BF;"> </span><span style="color:#C678DD;">const</span><span style="color:#ABB2BF;">)</span></span>
<span class="line"></span></code></pre><div class="line-numbers-wrapper"><span class="line-number">1</span><br><span class="line-number">2</span><br><span class="line-number">3</span><br><span class="line-number">4</span><br><span class="line-number">5</span><br><span class="line-number">6</span><br><span class="line-number">7</span><br></div></div><h2 id="connect-to-an-integration" tabindex="-1">Connect to an integration <a class="header-anchor" href="#connect-to-an-integration" aria-hidden="true">#</a></h2><div class="tip custom-block"><p class="custom-block-title">coming soon \u{1F91E}</p><p>First two integrations just need to be published</p></div>`,12),p=[t];function o(i,r,c,d,B,m){return a(),n("div",null,p)}var y=s(l,[["render",o]]);export{b as __pageData,y as default};
