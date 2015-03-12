
var assert = require('assert')
  , Referer = require('..')
  ;

function checkEquals (ref_obj, referer, term, medium) {
  assert.ok(ref_obj.known)
  assert.equal(ref_obj.referer, referer)
  assert.equal(ref_obj.search_term, term)
  assert.equal(ref_obj.medium, medium)
}

function check_no_term (ref_obj, referer, medium) {
  assert.ok(ref_obj.known)
  assert.equal(ref_obj.referer, referer)
  assert.equal(ref_obj.search_term, null)
  assert.equal(ref_obj.medium, medium)
}

describe('tests', function(){
  it('test_google_minimal', function(){
    var r = new Referer("http://www.google.com/search")
    assert.ok(r.known)
    assert.equal(r.referer, 'Google')
    assert.equal(r.search_term, null)
    assert.equal(r.medium, 'search')
  })

  it('test_google_term', function(){
    var r = new Referer("http://www.google.com/search?q=gateway+oracle+cards+denise+linn&hl=en&client=safari")
    checkEquals(r, 'Google', 'gateway oracle cards denise linn', 'search')
  })

  it('test_powered_by_google', function(){
    var r = new Referer("http://isearch.avg.com/pages/images.aspx?q=tarot+card+change&sap=\
    dsp&lang=en&mid=209215200c4147d1a9d6d1565005540b-b0d4f81a8999f5981f04537c5ec8468fd523459\
    3&cid=%7B50F9298B-C111-4C7E-9740-363BF0015949%7D&v=12.1.0.21&ds=AVG&d=7%2F23%2F2012+10%3\
    A31%3A08+PM&pr=fr&sba=06oENya4ZG1YS6vOLJwpLiFdjG91ICt2YE59W2p5ENc2c4w8KvJb5xbvjkj3ceMjny\
    TSpZq-e6pj7GQUylIQtuK4psJU60wZuI-8PbjX-OqtdX3eIcxbMoxg3qnIasP0ww2fuID1B-p2qJln8vBHxWztkp\
    xeixjZPSppHnrb9fEcx62a9DOR0pZ-V-Kjhd-85bIL0QG5qi1OuA4M1eOP4i_NzJQVRXPQDmXb-CpIcruc2h5FE9\
    2Tc8QMUtNiTEWBbX-QiCoXlgbHLpJo5Jlq-zcOisOHNWU2RSHYJnK7IUe_SH6iQ.%2CYT0zO2s9MTA7aD1mNjZmZ\
    DBjMjVmZDAxMGU4&snd=hdr&tc=test1")
    checkEquals(r, 'Google', 'tarot card change', 'search')
  })

  it('test_google_img_search', function(){
    var r = new Referer("http://www.google.fr/imgres?q=Ogham+the+celtic+oracle&hl=fr&safe=\
    off&client=firefox-a&hs=ZDu&sa=X&rls=org.mozilla:fr-FR:unofficial&tbm=isch&prmd=imvnsa&t\
    bnid=HUVaj-o88ZRdYM:&imgrefurl=http://www.psychicbazaar.com/oracles/101-ogham-the-celtic\
    -oracle-set.html&docid=DY5_pPFMliYUQM&imgurl=http://mdm.pbzstatic.com/oracles/ogham-the-\
    celtic-oracle-set/montage.png&w=734&h=250&ei=GPdWUIePCOqK0AWp3oCQBA&zoom=1&iact=hc&vpx=1\
    29&vpy=276&dur=827&hovh=131&hovw=385&tx=204&ty=71&sig=104115776612919232039&page=1&tbnh=\
    69&tbnw=202&start=0&ndsp=26&ved=1t:429,r:13,s:0,i:114&biw=1272&bih=826")
    checkEquals(r, 'Google Images', 'Ogham the celtic oracle', 'search')
  })

  it('test_yahoo_search', function(){
    var r = new Referer("http://es.search.yahoo.com/search;_ylt=A7x9QbwbZXxQ9EMAPCKT.Qt.?p="
    +"BIEDERMEIER+FORTUNE+TELLING+CARDS&ei=utf-8&type=685749&fr=chr-greentree_gc&xargs=0&pstar"
    +"t=1&b=11")
    checkEquals(r, 'Yahoo!', 'BIEDERMEIER FORTUNE TELLING CARDS', 'search')
  })

  it('test_yahoo_img_search', function(){
    var r = new Referer("http://it.images.search.yahoo.com/images/view;_ylt=A0PDodgQmGBQpn\
    4AWQgdDQx.;_ylu=X3oDMTBlMTQ4cGxyBHNlYwNzcgRzbGsDaW1n?back=http%3A%2F%2Fit.images.search.\
    yahoo.com%2Fsearch%2Fimages%3Fp%3DEarth%2BMagic%2BOracle%2BCards%26fr%3Dmcafee%26fr2%3Dp\
    iv-web%26tab%3Dorganic%26ri%3D5&w=1064&h=1551&imgurl=mdm.pbzstatic.com%2Foracles%2Fearth\
    -magic-oracle-cards%2Fcard-1.png&rurl=http%3A%2F%2Fwww.psychicbazaar.com%2Foracles%2F143\
    -earth-magic-oracle-cards.html&size=2.8+KB&name=Earth+Magic+Oracle+Cards+-+Psychic+Bazaa\
    r&p=Earth+Magic+Oracle+Cards&oid=f0a5ad5c4211efe1c07515f56cf5a78e&fr2=piv-web&fr=mcafee&\
    tt=Earth%2BMagic%2BOracle%2BCards%2B-%2BPsychic%2BBazaar&b=0&ni=90&no=5&ts=&tab=organic&\
    sigr=126n355ib&sigb=13hbudmkc&sigi=11ta8f0gd&.crumb=IZBOU1c0UHU")
    checkEquals(r, 'Yahoo! Images', 'Earth Magic Oracle Cards', 'search')
  })

  it("test_price_runner_search", function(){
    var r = new Referer("http://www.pricerunner.co.uk/search?displayNoHitsMessage=1&q=wild+wisdom+of+the+faery+oracle")
    checkEquals(r, 'PriceRunner', 'wild wisdom of the faery oracle', 'search')
  })

  it("test_bing_img", function(){
    var r = new Referer("http://www.bing.com/images/search?q=psychic+oracle+cards&view=det\
    ail&id=D268EDDEA8D3BF20AF887E62AF41E8518FE96F08")
    checkEquals(r, 'Bing Images', 'psychic oracle cards', 'search')
  })

  it("test_ixquick", function(){
    var r = new Referer("https://s3-us3.ixquick.com/do/search")
    assert.ok(r.known)
    assert.equal(r.referer, 'IXquick')
    assert.equal(r.search_term, null)
    assert.equal(r.medium, 'search')
  })

  it("test_aol_search", function(){
    var r = new Referer("http://aolsearch.aol.co.uk/aol/search?s_chn=hp&enabled_terms=&s_i\
    t=aoluk-homePage50&q=pendulums")
    checkEquals(r, 'AOL', 'pendulums', 'search')
  })

  it("test_ask_search", function(){
    var r = new Referer("http://uk.search-results.com/web?qsrc=1&o=1921&l=dis&q=pendulums&\
    dm=ctry&atb=sysid%3D406%3Aappid%3D113%3Auid%3D8f40f651e7b608b5%3Auc%3D1346336505%3Aqu%3D\
    pendulums%3Asrc%3Dcrt%3Ao%3D1921&locale=en_GB")
    checkEquals(r, 'Ask', 'pendulums', 'search')
  })

  it("test_mailru_search", function(){
    var r = new Referer("http://go.mail.ru/search?q=Gothic%20Tarot%20Cards&where=any&num=1\
    0&rch=e&sf=20")
    checkEquals(r, 'Mail.ru', 'Gothic Tarot Cards', 'search')
  })

  it("test_yandex_search", function(){
    var r = new Referer("http://images.yandex.ru/yandsearch?text=Blue%20Angel%20Oracle%20B"
    +"lue%20Angel%20Oracle&noreask=1&pos=16&rpt=simage&lr=45&img_url=http%3A%2F%2Fmdm.pbzstati"
    +"c.com%2Foracles%2Fblue-angel-oracle%2Fbox-small.png")
    checkEquals(r, 'Yandex Images', 'Blue Angel Oracle Blue Angel Oracle', 'search')
  })

  it("test_twitter_redirect", function(){
    var r = new Referer("http://t.co/chrgFZDb")
    check_no_term(r, 'Twitter', 'social')
  })

  it("test_fb_social", function(){
    var r = new Referer("http://www.facebook.com/l.php?u=http%3A%2F%2Fwww.psychicbazaar.co\
    m&h=yAQHZtXxS&s=1")
    check_no_term(r, 'Facebook', 'social')
  })

  it("test_fb_mobile", function(){
    var r = new Referer("http://m.facebook.com/l.php?u=http%3A%2F%2Fwww.psychicbazaar.com%\
    2Fblog%2F2012%2F09%2Fpsychic-bazaar-reviews-tarot-foundations-31-days-to-read-tarot-with\
    -confidence%2F&h=kAQGXKbf9&s=1")
    check_no_term(r, 'Facebook', 'social')
  })

  it("test_odnoklassniki", function(){
    var r = new Referer("http://www.odnoklassniki.ru/dk?cmd=logExternal&st._aid=Conversati\
    ons_Openlink&st.name=externalLinkRedirect&st.link=http%3A%2F%2Fwww.psychicbazaar.com%2Fo\
    racles%2F187-blue-angel-oracle.html")
    check_no_term(r, 'Odnoklassniki', 'social')
  })

  it("test_tumblr", function(){
    var r = new Referer("http://www.tumblr.com/dashboard")
    check_no_term(r, 'Tumblr', 'social')
  })

  it("test_tumblr_subdomain", function(){
    var r = new Referer("http://psychicbazaar.tumblr.com/")
    check_no_term(r, 'Tumblr', 'social')
  })

  it("test_yahoo_mail", function(){
    var r = new Referer("http://36ohk6dgmcd1n-c.c.yom.mail.yahoo.net/om/api/1.0/openmail.a\
    pp.invoke/36ohk6dgmcd1n/11/1.0.35/us/en-US/view.html/0")
    check_no_term(r, 'Yahoo! Mail', 'email')
  })

  it("test_outlookcom_mail", function(){
    var r = new Referer("http://co106w.col106.mail.live.com/default.aspx?rru=inbox")
    check_no_term(r, 'Outlook.com', 'email')
  })

  it("test_orange_webmail", function(){
    var r = new Referer("http://webmail1m.orange.fr/webmail/fr_FR/read.html?FOLDER=SF_INBO\
X&IDMSG=8594&check=&SORTBY=31")
    check_no_term(r, 'Orange Webmail', 'email')
  })

  it("test_internal", function(){
    var r = new Referer("http://www.snowplowanalytics.com/about/team",
      "http://www.snowplowanalytics.com/account/profile")
    assert.ok(r.known)
    assert.equal(r.medium, 'internal')
    assert.equal(r.search_term, null)
    assert.equal(r.referer, null)
  })
})