<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { t, lang, toggleLang, site, img, wa, brands, reviews } from './i18n'

const scrolled = ref(false)
const open = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 30 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))
const links = ['services', 'brands', 'why', 'reviews', 'visit']

const icons = {
  mech: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zM12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M4.9 19.1L7 17M17 7l2.1-2.1',
  gear: 'M7 4v16M17 4v16M7 12h10M3 4h8M13 4h8M3 20h8',
  elec: 'M13 2L4 14h7l-1 8 9-12h-7z',
  prog: 'M3 5h18v12H3zM8 21h8M12 17v4M7 9l3 2-3 2M12 13h4',
  body: 'M3 15l2-6h14l2 6v3H3zM7 18v2M17 18v2M5 9l2-4h10l2 4',
  check: 'M9 11l3 3 8-8M20 12v7a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h9',
}

const f = reactive({ name: '', phone: '', brand: '', model: '', service: 0, issue: '', urgent: false })
const err = ref('')
const pickBrand = (b) => { f.brand = b; document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' }) }
const send = () => {
  if (!f.name.trim() || !f.phone.trim()) { err.value = t.value.book.required; return }
  err.value = ''
  const m = t.value.book.msg
  const lines = [m.hello, f.urgent ? m.urgent : null, `${m.name}: ${f.name.trim()}`, `${m.phone}: ${f.phone.trim()}`,
    f.brand ? `${m.brand}: ${f.brand}` : null, f.model.trim() ? `${m.model}: ${f.model.trim()}` : null,
    `${m.service}: ${t.value.services.items[f.service].t}`, f.issue.trim() ? `${m.issue}: ${f.issue.trim()}` : null].filter(Boolean)
  window.open(wa(lines.join('\n')), '_blank', 'noopener')
}
const year = new Date().getFullYear()
</script>

<template>
  <!-- نسخة عرض: احذف هذا الشريط عند الإطلاق الرسمي -->
  <div class="demo-ribbon">{{ t.ribbon }}</div>

  <header class="nav" :class="{ scrolled, open }">
    <div class="container nav-in">
      <a href="#top" class="brand" @click="open = false">
        <span class="badge5">5</span>
        <span class="bt"><b>{{ t.brand }}</b><small>{{ t.brandSub }}</small></span>
      </a>
      <nav class="links"><a v-for="l in links" :key="l" :href="`#${l}`">{{ t.nav[l] }}</a></nav>
      <div class="acts">
        <span class="live hide-sm"><i></i>24/7</span>
        <button type="button" class="lang" @click="toggleLang">{{ lang === 'ar' ? 'EN' : 'ع' }}</button>
        <button type="button" class="burger" :aria-expanded="open" aria-label="Menu" @click="open = !open"><i></i><i></i></button>
      </div>
    </div>
    <div v-if="open" class="drawer">
      <a v-for="l in links" :key="l" :href="`#${l}`" @click="open = false">{{ t.nav[l] }}</a>
      <a :href="wa(t.book.msg.hello)" target="_blank" rel="noopener" class="btn btn-red" @click="open = false">{{ t.sticky.book }}</a>
    </div>
  </header>

  <main>
    <section class="hero" id="top">
      <div class="container hero-in">
        <div class="hero-copy">
          <p class="tag"><i></i>{{ t.hero.tag }}</p>
          <h1><span>{{ t.hero.title1 }}</span><span class="red">{{ t.hero.title2 }}</span></h1>
          <p class="lead">{{ t.hero.lead }}</p>
          <div class="ctas">
            <a class="btn btn-red" :href="wa(t.book.msg.hello)" target="_blank" rel="noopener">{{ t.hero.cta1 }}</a>
            <a class="btn btn-ghost" :href="`tel:${site.phone.tel}`">{{ t.hero.cta2 }} <span dir="ltr">{{ site.phone.label }}</span></a>
          </div>
        </div>
        <div class="hero-media">
          <div class="sign"><img :src="img('sign.jpg')" alt="" fetchpriority="high" /></div>
          <div class="pair">
            <img :src="img('changan-hood.jpg')" alt="" />
            <img :src="img('engine.jpg')" alt="" />
          </div>
          <div class="gauge"><b>{{ site.rating }}</b><small>★ · {{ site.reviews }}</small></div>
        </div>
      </div>
      <div class="hazard" aria-hidden="true"></div>
    </section>

    <section class="section brands" id="brands">
      <div class="container">
        <div class="head" v-reveal><p class="kicker">{{ t.brands.kicker }}</p><h2>{{ t.brands.title }}</h2></div>
        <div class="brand-grid">
          <button v-for="b in brands" :key="b" type="button" class="plate" :class="{ on: f.brand === b }" @click="pickBrand(b)" v-reveal>{{ b }}</button>
        </div>
        <p class="note">{{ t.brands.note }}</p>
      </div>
    </section>

    <section class="section services" id="services">
      <div class="container">
        <div class="head" v-reveal><p class="kicker">{{ t.services.kicker }}</p><h2>{{ t.services.title }}</h2></div>
        <div class="svc-grid">
          <article v-for="(s, i) in t.services.items" :key="s.k" class="svc" v-reveal>
            <span class="code">0{{ i + 1 }}</span>
            <svg viewBox="0 0 24 24" aria-hidden="true"><path :d="icons[s.k]" /></svg>
            <h3>{{ s.t }}</h3>
            <p>{{ s.d }}</p>
          </article>
        </div>
      </div>
    </section>

    <section class="section why" id="why">
      <div class="container why-in">
        <div class="why-photo" v-reveal><img :src="img('workshop-bays.jpg')" alt="" loading="lazy" /></div>
        <div>
          <div class="head" v-reveal><p class="kicker">{{ t.why.kicker }}</p><h2>{{ t.why.title }}</h2></div>
          <div class="why-grid">
            <div v-for="p in t.why.points" :key="p.t" class="why-item" v-reveal>
              <b class="big">{{ p.n }}</b>
              <h3>{{ p.t }}</h3>
              <p>{{ p.d }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section reviews" id="reviews">
      <div class="container">
        <div class="rev-head" v-reveal>
          <div><p class="kicker">{{ t.reviews.kicker }}</p><h2>{{ t.reviews.title }}</h2></div>
          <div class="score"><b>{{ site.rating }}</b><span>★★★★★</span><small>{{ site.reviews }} {{ t.reviews.count }}</small></div>
        </div>
        <div class="rev-grid">
          <blockquote v-for="r in reviews" :key="r.n" class="rev" dir="rtl" v-reveal>
            <p>{{ r.q }}</p>
            <footer><b>{{ r.n }}</b><span>★★★★★</span></footer>
          </blockquote>
        </div>
        <p class="note">{{ t.reviews.note }}</p>
      </div>
    </section>

    <section class="section book" id="book">
      <div class="container book-in">
        <div v-reveal>
          <p class="kicker">{{ t.book.kicker }}</p>
          <h2>{{ t.book.title }}</h2>
          <p class="sub">{{ t.book.sub }}</p>
          <a class="call" :href="`tel:${site.phone.tel}`" dir="ltr">{{ site.phone.label }}</a>
        </div>
        <form class="form" novalidate @submit.prevent="send" v-reveal>
          <div class="row">
            <label><span>{{ t.book.name }}</span><input v-model="f.name" autocomplete="name" /></label>
            <label><span>{{ t.book.phone }}</span><input v-model="f.phone" type="tel" dir="ltr" autocomplete="tel" /></label>
          </div>
          <div class="row">
            <label><span>{{ t.book.brand }}</span>
              <select v-model="f.brand"><option value="">—</option><option v-for="b in brands" :key="b" :value="b">{{ b }}</option><option :value="t.book.other">{{ t.book.other }}</option></select>
            </label>
            <label><span>{{ t.book.model }}</span><input v-model="f.model" placeholder="Coolray 2023" dir="ltr" /></label>
          </div>
          <label><span>{{ t.book.service }}</span>
            <select v-model.number="f.service"><option v-for="(s, i) in t.services.items" :key="s.k" :value="i">{{ s.t }}</option></select>
          </label>
          <label><span>{{ t.book.issue }}</span><textarea v-model="f.issue" rows="3"></textarea></label>
          <label class="urgent"><input type="checkbox" v-model="f.urgent" /><span>{{ t.book.urgent }}</span></label>
          <p v-if="err" class="err" role="alert">{{ err }}</p>
          <button class="btn btn-red block" type="submit">{{ t.book.send }}</button>
        </form>
      </div>
    </section>

    <section class="section visit" id="visit">
      <div class="container visit-in">
        <div class="visit-card" v-reveal>
          <p class="kicker">{{ t.visit.kicker }}</p>
          <h2>{{ t.visit.title }}</h2>
          <p class="addr">{{ t.visit.addr }}</p>
          <p class="open"><i></i>{{ t.visit.hours }}</p>
          <div class="ctas">
            <a class="btn btn-red" :href="site.maps" target="_blank" rel="noopener">{{ t.visit.dir }}</a>
            <a class="btn btn-ghost" :href="`tel:${site.phone.tel}`">{{ t.visit.call }}</a>
          </div>
        </div>
        <div class="map" v-reveal><iframe :src="site.mapEmbed" title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container foot">
      <span class="badge5">5</span>
      <b>{{ t.brand }} · {{ t.brandSub }}</b>
      <a :href="`tel:${site.phone.tel}`" dir="ltr">{{ site.phone.label }}</a>
      <small>© {{ year }} {{ t.footer.rights }} · <em>{{ t.footer.demo }}</em></small>
    </div>
  </footer>
  <div class="sticky">
    <a :href="`tel:${site.phone.tel}`">{{ t.sticky.call }}</a>
    <a :href="wa(t.book.msg.hello)" target="_blank" rel="noopener" class="main">{{ t.sticky.book }}</a>
  </div>
</template>
