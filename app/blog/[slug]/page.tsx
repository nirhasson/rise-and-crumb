import { client } from "@/lib/sanity"
import { PortableText } from "@portabletext/react"
import { Navigation } from "@/components/bread/navigation"
import { ChevronLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import urlBuilder from "@sanity/image-url"

// 1. הגדרת ה-URL Builder (קריטי!)
const builder = urlBuilder(client)
const urlFor = (source: any) => source ? builder.image(source).url() : "/placeholder.svg"

const FULL_FLOUR_GUIDE = `
      <p>כשאתם לשים בצק לחם, הקמח שבחרתם כבר קבע לכם את רוב התוצאה. הצבע של הקרום, עומק הטעם, מרקם הפירור, עד כמה הלחם יחזיק לאורך יומיים - כל אלה נולדים בבחירה שנדמית שולית. הנה מה שצריך לדעת.</p>

      <h2>הגלוטן: למה אחוז החלבון קובע הכל</h2>
      <p>כשקמח נפגש עם מים, שני חלבונים - גלוטנין וגליאדין - נקשרים ביחד ויוצרים רשת אלסטית שנקראת גלוטן. הרשת הזו עושה שתי עבודות: היא מעניקה לבצק את המבנה שלו, והיא לוכדת את בועות הפחמן הדו-חמצני שנוצרות בתסיסה - מה שגורם ללחם לתפוח.</p>

      <p>קמח עם אחוז חלבון גבוה יותר בונה רשת גלוטן חזקה וגמישה יותר. זה אומר שהבצק יכול להחזיק יותר גז, לעלות גבוה יותר, ולתת פירור פתוח עם חורים גדולים. קמח עם חלבון נמוך יותר נותן בצק קל יותר לעבודה, אבל תוצאה צפופה ועשירה יותר - שמתאימה לסגנונות לחם שונים.</p>

      <div class="bg-muted p-6 my-6">
        <h3 class="font-bold text-lg mb-4">% חלבון בקמחים נפוצים:</h3>
        <ul class="list-disc pr-6 space-y-3 text-sm">
          <li><strong>קמח לחם חזק (Strong Bread Flour):</strong> 12–14% - לחמי מחמצת, באגטים, לחמי תבנית</li>
          <li><strong>קמח לכל מטרה:</strong> 10–12% - לחמים מהירים, רולים, פוקצ'ה</li>
          <li><strong>קמח מחיטה מלאה:</strong> 13–14%, אך הסובין פוגם ברשת הגלוטן - פירור סגור יותר</li>
          <li><strong>קמח שיפון:</strong> חלבון אחר לגמרי (סקלין, לא גלוטן) - בצק דביק, לחם צפוף וחמצמץ</li>
          <li><strong>קמח כוסמין (Spelt):</strong> 12–15%, אך קשרי הגלוטן שבירים יותר - לחם עדין בטעמו</li>
        </ul>
      </div>

      <h2>קמח לבן חזק: הבסיס שמרבית הלחמים צריכים</h2>
      <p>קמח לחם לבן - מה שנקרא בחו"ל Strong Bread Flour - הוא הבחירה הנכונה לכל לחם שאתם רוצים שיעלה גבוה ויצור פירור אוורירי. בישראל תמצאו אותו בחנויות מתמחות תחת השם "קמח לחם" או "קמח חזק", עם תכולת חלבון של 12% ומעלה.</p>

      <p>הגלוטן החזק שמתפתח בו מחזיק את בועות הגז לאורך תסיסה ארוכה - לכן הוא הבחירה הטבעית ללחמי מחמצת שתופחים 12–18 שעות, לבאגט הצרפתי שדורש מבנה עדין אך עמיד, ולכל לחם תבנית שאתם רוצים שיצא גבוה ורך. עם קמח כזה, ה"חלון" שנוצר כשמותחים את הבצק נגד אור הוא כמעט שקוף - סימן לגלוטן חזק ומפותח.</p>

      <h2>קמח לכל מטרה: קל, מהיר, מספיק טוב</h2>
      <p>קמח לכל מטרה (10–12% חלבון) הוא הקמח שרוב הבתים בישראל מחזיקים. לחם שמרים פשוט, לחם בננה, רולים לשבת - הוא יעשה את העבודה היטב. מכיוון שהגלוטן שלו חלש יותר, הבצק נוח ורגיש לעיסוי, והתוצאה רכה ועדינה יותר.</p>

      <p>הבעיה מתחילה כשמנסים להכין לחם מחמצת עם תסיסה ארוכה: הגלוטן לא מחזיק מספיק, הבצק נמרח, והלחם לא עולה כמו שצריך. אם זה כל מה שיש לכם - אפשר לפצות עם הידרציה נמוכה יותר (60–65% במקום 75%) וזמן תסיסה קצר יותר.</p>

      <div class="bg-primary/5 border-r-4 border-primary p-6 my-6">
        <h3 class="font-bold text-lg mb-3">טיפ: ערבוב קמחים לתוצאה מדויקת</h3>
        <p class="mb-3">אפיות מקצועיים לא משתמשים תמיד בקמח אחד - הם משלבים. כך ניתן לכוונן בדיוק את המרקם, הטעם והמבנה.</p>
        <p class="font-medium">שילובים שעובדים:</p>
        <ul class="list-disc pr-6 mt-2 space-y-2">
          <li><strong>80% לבן חזק + 20% מחיטה מלאה:</strong> עומק טעמים בלי לאבד את האוורירי</li>
          <li><strong>70% לבן + 30% שיפון:</strong> מחמצת עם חמיצות מובהקת ומרקם ייחודי</li>
          <li><strong>100% כוסמין:</strong> לחם מלא בעל טעם אגוזי - מתאים לשמרים יותר ממחמצת</li>
          <li><strong>60% לבן + 40% שיפון מלא:</strong> לחם שיפון גרמני קלאסי - צפוף, חמצמץ, נשמר שבוע</li>
        </ul>
      </div>

      <h2>קמח מחיטה מלאה: עומק טעמים, מרקם שונה</h2>
      <p>קמח מחיטה מלאה כולל את כל חלקי גרעין החיטה - פרי הקמח (אנדוספרם), הסובין (bran) וחיידק הנבט (germ). מה שמרוויחים: טעם עמוק ואגוזי, ערכי תזונה גבוהים יותר, ולחם שמחזיק לחות לאורך זמן. מה שמשלמים: הסובין חותך פיזית את רשת הגלוטן, כך שהפירור מגיע סגור יותר, הבצק עולה פחות, והלחם כבד יותר.</p>

      <p>לכן רוב המתכונים המקצועיים לא משתמשים ב-100% קמח מלא - אלא מוסיפים 20–40% כחלק מתערובת עם קמח לבן. כך מקבלים את הטעם בלי לוותר על המרקם. חשוב גם לדעת שקמח מלא סופג יותר מים - אם מחליפים קמח לבן בקמח מלא, הוסיפו 2–3% מים לבצק.</p>

      <h2>קמח שיפון: חוק אחר לגמרי</h2>
      <p>שיפון הוא הפרה הקדושה של עולם האפייה האירופאי - ובצדק. הוא לא מכיל גלוטן במובן הרגיל: החלבונים שלו יוצרים מבנה שונה לחלוטין. הבצק דביק, לא אלסטי, ומסרב להיות מעוצב כמו לחם חיטה. ובכל זאת, לחמי שיפון הם מהסוגים האהובים ביותר בגרמניה, בסקנדינביה ובמזרח אירופה.</p>

      <p>השיפון עשיר בפנטוסנים - סוג של פחמימות שסופגות כמות עצומה של מים וחיוניות לבצק שיפון. הוא גם מכיל פעילות אנזימטית גבוהה, שמדרשת אפייה בחומציות גבוהה (מחמצת) כדי לשמור על מבנה הלחם. לכן לחם שיפון כמעט תמיד נאפה עם מחמצת - לא כי זה אופנה, אלא כי זה הכרחי לתוצאה הנכונה.</p>

      <p>לחם שיפון מלא (100%) לא מעוצב אלא יוצק לתבנית. הוא צפוף, חמצמץ, עשיר בטעם ונשמר שבוע שלם - לפעמים משתבח עם הזמן.</p>

      <h2>קמח כוסמין: העתיק והעדין</h2>
      <p>כוסמין (Spelt) הוא זן חיטה עתיק שהיה נפוץ באירופה לפני שחיטה מודרנית החליפה אותו. בשנים האחרונות הוא חוזר - בעיקר בגלל הטעם האגוזי-מתקתק שלו ותחושת הקלות שאנשים מדווחים עליה בעיכול. חשוב לדגש: כוסמין מכיל גלוטן ולא מתאים לצליאקים.</p>

      <p>הגלוטן של כוסמין שביר יותר מגלוטן של חיטה רגילה - לכן לשים אותו פחות ממה שמלושים חיטה, ומוסיפים פחות מים (הידרציה של 65% לעומת 75% בחיטה). תוצאה: לחם בעל טעם ייחודי, פירור סגור ומרקם מלא. עובד מצוין גם עם שמרים וגם עם מחמצת.</p>

      <h2>איזה קמח בשביל איזה לחם?</h2>
      <ul class="list-disc pr-6 space-y-2 my-4">
        <li><strong>לחם מחמצת קלאסי עם חורים גדולים:</strong> קמח לבן חזק 12%+, או 80/20 עם מלא</li>
        <li><strong>לחם מהיר לשבת, רולים:</strong> קמח לכל מטרה - קל לעבודה, תוצאה רכה</li>
        <li><strong>לחם בעל טעם עמוק ועדין:</strong> תערובת עם 20–30% קמח מלא</li>
        <li><strong>לחם שיפון גרמני:</strong> 30–100% שיפון, חייב מחמצת, יוצק לתבנית</li>
        <li><strong>לחם כוסמין:</strong> 100% כוסמין, הידרציה נמוכה, עדין ואגוזי</li>
      </ul>

      <p class="text-lg font-medium mt-8">אין קמח "טוב" או "רע" - יש קמח שמתאים למה שאתם אופים. ההמלצה הפשוטה ביותר: התחילו עם קמח לבן חזק, נסו מתכון מחמצת בסיסי ושלטו בו לגמרי. אחרי כמה אפיות תתחילו לשאול "מה יקרה אם אוסיף 20% שיפון?" - ושם מתחילה ההנאה האמיתית.</p>
    `;

const SOURDOUGH_SCIENCE_GUIDE = `
  <p>יש לכם צנצנת מחמצת על השיש. אתם מאכילים אותה, מסתכלים על הבועות, מריחים את הריח החמצמץ. אבל מה בעצם קורה שם? ומה ההבדל בין מחמצת "טובה" לבין אחת שנותנת לחם שטוח? המדע מאחורי הצנצנת הוא גם המפתח לשיפור כל לחם שתאפו.</p>


  <h2>מה זה בעצם מחמצת - מיקרוביום בצנצנת</h2>
  <p>מחמצת היא לא יצור אחד - היא קהילה שלמה. בתוך כל כף מחמצת פעילה חיים שני סוגים של מיקרואורגניזמים שעובדים יחד:</p>

  <ul class="list-disc pr-6 space-y-3 my-4">
    <li><strong>שמרי בר (Wild Yeast) - בעיקר Saccharomyces cerevisiae וקרובי משפחה:</strong> הם אחראים על התפיחה. הם אוכלים את הסוכרים שבקמח ומייצרים פחמן דו-חמצני - הבועות שמנפחות את הלחם.</li>
    <li><strong>חיידקי חומצת חלב (Lactic Acid Bacteria - LAB) - בעיקר Lactobacillus:</strong> הם האחראים על הטעם. הם מייצרים שתי חומצות: חומצה לקטית (חמיצות עדינה, חלבית) וחומצה אצטית (חמיצות חדה, מחודדת - כמו חומץ).</li>
  </ul>

  <p>היחס בין שני סוגי החומצות הוא מה שנותן לכל מחמצת את "אישיות" הטעם שלה. מחמצת מסן פרנסיסקו ידועה בחמיצות אגרסיבית בגלל כמות גבוהה של חומצה אצטית. לחמי מחמצת סקנדינביים עדינים יותר בגלל דומיננטיות של חומצה לקטית.</p>

  <div class="bg-muted p-6 my-6">
    <h3 class="font-bold text-lg mb-3">מה משפיע על יחס החומצות?</h3>
    <ul class="list-disc pr-6 space-y-2 text-sm">
      <li><strong>טמפרטורה גבוהה (25-28°C):</strong> מעדיפה חומצה לקטית - טעם עדין ומתקתק</li>
      <li><strong>טמפרטורה נמוכה (18-22°C):</strong> מעדיפה חומצה אצטית - טעם חד וחמצמץ</li>
      <li><strong>הידרציה גבוהה:</strong> יותר חומצה לקטית</li>
      <li><strong>הידרציה נמוכה (בצק קשה):</strong> יותר חומצה אצטית</li>
    </ul>
  </div>

  <h2>מחזור ה"Rise and Fall" - למה זה קריטי</h2>
  <p>מחמצת בריאה עוברת מחזור ברור: לאחר האכלה היא עולה (חיידקים ושמרים אוכלים ומתרבים), מגיעה לשיא (Peak), ואז יורדת (הסוכרים נגמרו). אפייה בשיא זו הנקודה שבה הכוח הגדול ביותר.</p>

  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRp1tgexZZezTStlzRSlNVjxfUibsjR-4GDQnSHrRtfVyB2qVm5YWgcOqPr&s=10" alt="מחמצת בצנצנת" class="my-8 w-full object-cover" style="max-height:400px;" />

  <p>זה למה ה-Float Test עובד: מחמצת בשיא מלאה בבועות גז, וצפה על המים. מחמצת שכבר עברה את השיא - הגז יצא, וצנצנת ישקע.</p>

  <h2>טמפרטורה: המשתנה הכי לא מוערך</h2>
  <p>אין גורם בודד שמשפיע יותר על מהירות ואיכות המחמצת מהטמפרטורה. ההבדל בין 20°C ל-28°C הוא ההבדל בין 12 שעות לשעתיים עד שיא.</p>

  <div class="bg-primary/5 border-r-4 border-primary p-6 my-6">
    <h3 class="font-bold text-lg mb-3">טמפרטורות ומשמעותן</h3>
    <ul class="list-disc pr-6 space-y-2 text-sm">
      <li><strong>מתחת ל-18°C:</strong> פעילות אטית מאוד, חיידקים עובדים כמעט בהאטה</li>
      <li><strong>18-22°C:</strong> תסיסה איטית ועמוקה, טעם מורכב יותר, חומצה אצטית גבוהה</li>
      <li><strong>22-26°C:</strong> האזור האידיאלי לרוב לחמי המחמצת, איזון מושלם</li>
      <li><strong>26-30°C:</strong> תסיסה מהירה, טעם עדין יותר, מתאים ללחמים עם תסיסה קצרה</li>
      <li><strong>מעל 35°C:</strong> שמרים מתים, מחמצת נהרסת</li>
    </ul>
  </div>

  <p>בישראל בקיץ, כשהמטבח מגיע ל-30°C, הבצק יכול לתסוס ב-3-4 שעות במקום 12. האפייה קיצית דורשת התאמה - פחות מחמצת, מים קרים יותר, ולעיתים תסיסה במקרר.</p>

  <h2>מה הופך מחמצת לחזקה? הקשר בין גיל לכוח</h2>
  <p>הרבה מתחילים מתייאשים מהלחם הראשון. האמת: מחמצת בת שבועיים חלשה בהגדרה. לוקח לקהילת המיקרואורגניזמים מספר שבועות להגיע לאיזון יציב ולשלוט בסביבה שלה.</p>

  <p>מחמצת "בוגרת" (בת חודש ומעלה) מחזיקה pH נמוך יותר, שמגן עליה מחיידקים פולשים ונותן לשמרים ולLAB שלה יתרון תחרותי. זאת הסיבה שמחמצות ותיקות עקביות יותר - לא "קסם עתיקות" אלא ביולוגיה.</p>

  <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?w=900&q=80" alt="לחם מחמצת פרוס" class="my-8 w-full object-cover" style="max-height:420px;" />

  <h2>הקשר בין pH לאפייה</h2>
  <p>כשהמחמצת בשיא, ה-pH שלה נמוך (חומצי יותר) - בערך 3.5 עד 4. החומציות הזו קריטית לאפייה מסיבות מספר:</p>

  <ul class="list-disc pr-6 space-y-2 my-4">
    <li>היא מחזקת את הגלוטן (חומציות מחזקת קשרי גלוטן)</li>
    <li>היא עוצרת פעילות של אנזימים שמפרקים את הבצק (פרוטאזות)</li>
    <li>היא מאריכה את חיי הלחם לאחר האפייה</li>
    <li>היא נותנת את הטעם האופייני</li>
  </ul>

  <h2>שלוש שאלות שכל קורא צריך לענות</h2>

  <p><strong>1. למה המחמצת שלי לא עולה?</strong><br/>
  ב-90% מהמקרים: טמפרטורה נמוכה מדי או קמח חלש מדי. נסו להניח את הצנצנת במקום חמים יותר (מעל הצינורות, ליד התנור) ולעבור לקמח מלא לפחות לחלק מהאכלות.</p>

  <p><strong>2. למה הלחם שלי שטוח?</strong><br/>
  מחמצת שנוספה מוקדם מדי (לפני השיא) או מאוחר מדי (אחרי הירידה). גם לישה לא מספקת ועיצוב רפוי הם גורמים תכופים.</p>

  <p><strong>3. איך מקבלים חורים גדולים בלחם?</strong><br/>
  שלושה גורמים: הידרציה גבוהה (75%+), תסיסה ארוכה (12-18 שעות), ועיצוב עדין שמשמר את בועות הגז. לא כל לחם צריך חורים גדולים - לחם כפרי עם פירור פתוח הוא עניין של טעם ואורחות.</p>

  <div class="bg-muted p-6 my-6">
    <h3 class="font-bold text-lg mb-3">מה ההבדל בין הכתבה הזאת לעמוד המחמצת באתר?</h3>
    <p class="text-sm">עמוד מדריך המחמצת שלנו מלמד <em>איך</em> - שלב אחרי שלב. הכתבה הזאת מסבירה <em>למה</em>. השניים ביחד נותנים לכם את הכלים לפתור בעיות לבד ולהבין מה המחמצת שלכם "אומרת".</p>
  </div>

  <p class="text-lg font-medium mt-8">מחמצת היא לא מתכון - היא מערכת יחסים. ברגע שמבינים את המיקרוביולוגיה הפשוטה שמאחוריה, כל ה"כישלונות" הופכים להיות מידע: "היה חם מדי", "האכלתי מאוחר", "הקמח היה חלש". ומידע - אפשר לעבוד איתו.</p>
`

import type { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (slug === "local-flour-guide" || slug === "local-1") {
    return {
      title: "מדריך הקמחים ללחם | מגזין | Rise & Crumb",
      description: "לבן, מלא, שיפון, כוסמין - כל מה שצריך לדעת לפני שבוחרים קמח",
      openGraph: {
        title: "מדריך הקמחים ללחם | Rise & Crumb",
        description: "לבן, מלא, שיפון, כוסמין - כל מה שצריך לדעת לפני שבוחרים קמח",
        url: "https://www.riseandcrumb.com/blog/local-flour-guide",
        images: [{ url: "https://www.riseandcrumb.com/images/blog/wheat-grain.jpg" }],
        type: "article",
        locale: "he_IL",
        siteName: "Rise & Crumb",
      },
    }
  }
  if (slug === "local-sourdough-science") {
    return {
      title: "המדע מאחורי המחמצת | מגזין | Rise & Crumb",
      description: "מה בעצם קורה בצנצנת? חיידקים, שמרים, pH וטמפרטורה - המדע שמאחורי לחם מחמצת טוב",
      openGraph: {
        title: "המדע מאחורי המחמצת | Rise & Crumb",
        description: "מה בעצם קורה בצנצנת? חיידקים, שמרים, pH וטמפרטורה - המדע שמאחורי לחם מחמצת טוב",
        url: "https://www.riseandcrumb.com/blog/local-sourdough-science",
        images: [{ url: "https://www.riseandcrumb.com/images/blog/sour dough starter.jpg" }],
        type: "article",
        locale: "he_IL",
        siteName: "Rise & Crumb",
      },
    }
  }
  const article = await client.fetch(
    `*[_type == "article" && (slug.current == $slug || _id == $slug)][0]{title, excerpt, "imageUrl": mainImage.asset->url}`,
    { slug }
  )
  if (!article) return { title: "כתבה לא נמצאה" }
  return {
    title: `${article.title} | מגזין | Rise & Crumb`,
    description: article.excerpt,
    openGraph: {
      title: `${article.title} | מגזין | Rise & Crumb`,
      description: article.excerpt,
      url: `https://www.riseandcrumb.com/blog/${slug}`,
      images: article.imageUrl ? [{ url: article.imageUrl }] : [],
      type: 'article',
      locale: 'he_IL',
      siteName: 'Rise & Crumb',
    },
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  if (slug === "local-flour-guide" || slug === "local-1") {
    return (
      <RenderPost
        post={{
          title: "מדריך הקמחים ללחם: לבן, מלא, שיפון וכוסמין",
          excerpt: "לבן חזק, מחיטה מלאה, שיפון, כוסמין - מה ההבדל, מה מתאים לאיזה לחם, ולמה אחוז החלבון קובע הכל.",
          content: FULL_FLOUR_GUIDE,
          image: "/images/blog/wheat-grain.jpg",
          isLocal: true
        }}
      />
    );
  }

  if (slug === "local-sourdough-science") {
    return (
      <RenderPost
        post={{
          title: "המדע מאחורי המחמצת: חיידקים, שמרים וטמפרטורה",
          excerpt: "מה בעצם קורה בצנצנת שלכם? מיקרוביולוגיה פשוטה שתסביר למה המחמצת לפעמים לא עולה, למה הלחם שטוח, ואיך לשלוט בטעם.",
          content: SOURDOUGH_SCIENCE_GUIDE,
          image: "/images/blog/sour dough starter.jpg",
          isLocal: true
        }}
      />
    );
  }

  const article = await client.fetch(`
    *[_type == "article" && (slug.current == $slug || _id == $slug)][0]{
      _id, title, excerpt, mainImage, content, publishedAt
    }
  `, { slug });

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-2xl font-bold">הכתבה לא נמצאה</h1>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 mt-8 bg-secondary text-secondary-foreground px-6 py-3 text-sm font-display font-black uppercase tracking-widest hover:bg-secondary/80 transition-colors duration-200"
        >
          חזרה למגזין
          <ChevronLeft className="h-4 w-4" />
        </Link>
      </div>
    );
  }

  return <RenderPost post={article} />;
}

function RenderPost({ post }: { post: any }) {
  // קומפוננטות רינדור ל-PortableText (מאוחד)
  const portableTextComponents = {
    types: {
      image: ({ value }: any) => {
        if (!value?.asset?._ref) return null;
        return (
          <div className="relative w-full h-96 my-6 rounded-lg overflow-hidden border border-border">
            <Image src={urlFor(value.asset)} alt={value.alt || "תמונה"} fill className="object-cover" />
          </div>
        );
      },
      spacer: ({ value }: any) => {
        const heights: Record<string, string> = { small: 'h-4', medium: 'h-12', large: 'h-24' };
        return <div className={heights[value.size] || 'h-12'} />;
      },
      youtube: ({ value }: any) => {
        const { url } = value;
        if (!url) return null;
        const id = url.includes('v=') ? url.split('v=')[1].split('&')[0] : url.split('/').pop().split('?')[0];
        return (
          <div className="my-10 relative pb-[56.25%] h-0 overflow-hidden rounded-xl shadow-lg border-2 border-border bg-black">
            <iframe className="absolute top-0 left-0 w-full h-full" src={`https://www.youtube.com/embed/${id}`} title="YouTube" allowFullScreen></iframe>
          </div>
        );
      },
    },
    block: {
      h2: ({ children }: any) => <h2 className="text-3xl font-black mt-8 mb-4">{children}</h2>,
      h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
      normal: ({ children }: any) => <p className="leading-relaxed mb-4 whitespace-pre-wrap">{children}</p>,
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 text-right" dir="rtl">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 mb-6 bg-secondary text-secondary-foreground px-6 py-3 text-sm font-display font-black uppercase tracking-widest hover:bg-secondary/80 transition-colors duration-200"
      >
        חזרה למגזין
        <ChevronLeft className="h-4 w-4" />
      </Link>
      <Navigation />
      <article className="mt-12 space-y-8">
        <header className="space-y-4">
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">{post.title}</h1>
          {post.excerpt && <p className="text-xl text-muted-foreground leading-relaxed max-w-3xl">{post.excerpt}</p>}
        </header>

        <div className="relative w-full h-[450px] border-2 border-border overflow-hidden bg-muted shadow-xl">
          <Image
            src={post.isLocal ? post.image : (post.mainImage?.asset ? urlFor(post.mainImage) : "/placeholder.svg")}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none prose-red dark:prose-invert">
          {post.isLocal ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <PortableText value={post.content} components={portableTextComponents} />
          )}
        </div>
      </article>
    </div>
  );
}