// Inhalte der Unterseiten: Leistungen, Fallstudien, Journal.
// Technische Angaben sind gegen den Shopware-Quellcode (v6.5.8, v6.6.0, v6.7.0) geprüft.

export const serviceDetails = [
  {
    slug: 'shopware-plugin-entwicklung',
    nav: 'Plugin-Entwicklung',
    glyph: '{ }',
    metaTitle: 'Shopware Plugin-Entwicklung (Shopware 6) | Freelancer Sascha Ernst',
    metaDescription: 'Individuelle Shopware-6-Plugins für Agenturen und Shopbetreiber: Events, DAL, Administration, CMS-Elemente. Update-sicher entwickelt von Freelancer Sascha Ernst, remote im DACH-Raum.',
    title: 'Shopware Plugin-Entwicklung,', titleEm: 'die Updates übersteht.',
    lede: 'Individuelle Shopware-6-Plugins für Agenturen und Shopbetreiber. Sauber an den Erweiterungspunkten angedockt, mit Konfiguration in der Administration und ohne Überraschungen beim nächsten Update.',
    intro: [
      'Wenn Shopware etwas nicht von Haus aus kann, ist ein Plugin meistens der richtige Weg. Entscheidend ist, wo es andockt. Ein Plugin, das über Events, dekorierte Services und das DAL arbeitet, übersteht Updates. Eines, das Core-Templates und -Klassen blind überschreibt, fällt beim nächsten Minor-Release auseinander.',
      'Ich entwickle Plugins so, wie ich sie selbst warten möchte: mit strikten Typen, klarer Konfiguration und Installationsroutinen, die sich beliebig oft ausführen lassen.',
    ],
    tasks: [
      'Eigene Funktionen über Event Subscriber und dekorierte Services',
      'Eigene Entities und Custom Fields im DAL, mit sauberen Migrationen',
      'Erweiterungen der Administration mit Vue.js, inklusive Konfigurationsseiten',
      'Eigene CMS-Blöcke und -Elemente für Erlebniswelten',
      'Regeln im Rule Builder und Sales-Channel-spezifische Logik',
      'CLI-Commands, Scheduled Tasks und Message-Queue-Handler',
      'Überarbeitung bestehender Plugins, die bei Updates Probleme machen',
      'Code-Review für Plugins aus anderen Händen',
    ],
    approach: [
      'Zuerst klären wir, was das Plugin tun soll und welche Shopware-Version läuft. Dann suche ich den passenden Erweiterungspunkt. Oft gibt es ein Event oder einen Service, den man dekorieren kann, statt etwas zu überschreiben.',
      'Entwickelt wird lokal in einer DDEV-Umgebung und versioniert in Git. Für Agenturen arbeite ich direkt in Euren Repositories und nach Euren Konventionen.',
      'Jedes Plugin lässt sich installieren, aktualisieren und wieder deinstallieren, ohne dass die Datenbank Reste oder Dubletten behält. Klingt selbstverständlich, ist es in der Praxis leider nicht.',
    ],
    caseSlug: 'landingpage-plugin',
    articleSlug: 'shopware-custom-fields-1062-idempotent',
    faq: [
      { q: 'Kannst Du ein Plugin aus dem Shopware Store anpassen?', a: 'Ja, sofern die Lizenz das erlaubt. Meistens ist es besser, das Store-Plugin über ein eigenes kleines Plugin zu erweitern, statt es direkt zu ändern. So bleiben Updates des Herstellers möglich.' },
      { q: 'Was kostet ein individuelles Plugin?', a: 'Das hängt vom Umfang ab. Kleine Erweiterungen sind oft in wenigen Tagen erledigt. Nach dem Erstgespräch bekommst Du eine Einschätzung nach Aufwand oder einen Festpreis.' },
      { q: 'Bekomme ich den Quellcode?', a: 'Ja. Der Code gehört Dir beziehungsweise Deinem Kunden und liegt in Eurem Repository.' },
    ],
  },
  {
    slug: 'shopware-storefront',
    nav: 'Storefront & Themes',
    glyph: '</>',
    metaTitle: 'Shopware Theme-Entwicklung & Storefront anpassen | Sascha Ernst',
    metaDescription: 'Shopware-6-Themes mit Twig, SCSS und Storefront-JS-Plugins: Theme anpassen, Navigation, Suche, Listings und Barrierearmut. Update-sicher gebaut. Freelancer Sascha Ernst, remote im DACH-Raum.',
    title: 'Storefront und Themes,', titleEm: 'die Updates überleben.',
    lede: 'Themes mit Twig, SCSS und eigenen JavaScript-Plugins. Sauber vererbt statt kopiert, damit das nächste Shopware-Update keine Templates bricht.',
    intro: [
      'Die Storefront ist das, was Deine Kundinnen und Kunden sehen. Sie soll gut aussehen, schnell laden und nach jedem Update weiterlaufen. Der dritte Punkt geht am häufigsten schief: Shopware ändert zwischen Versionen Template-Pfade und Blöcke, und ein Child-Theme, das sich darauf verlässt, wirft plötzlich Fehler.',
      'Ich baue Themes deshalb so, dass sie möglichst wenig überschreiben, und prüfe sie vor jedem Update gegen die Zielversion.',
    ],
    tasks: [
      'Eigene Themes und Child-Themes auf Basis des Shopware-Standards',
      'Twig-Templates mit sauberer Vererbung über sw_extends',
      'SCSS nach BEM, Anpassung der Bootstrap-Variablen',
      'Storefront-JS-Plugins für Navigation, Suche und Overlays',
      'Prüfung des Themes vor jedem Shopware-Update',
      'Performance: Bildgrößen, Theme-Assets, unnötige Requests',
      'Barrierearmut: Fokus, Tastaturbedienung, Kontraste',
      'Umsetzung von Designs aus Figma oder von Eurer Agentur',
    ],
    approach: [
      'Vor einem Update gleiche ich das Theme mit den Upgrade-Hinweisen der Zielversion ab und suche alle Stellen, die entfernte Templates oder Blöcke erweitern. Aktualisiert wird zuerst lokal, mit einer Kopie des Live-Shops.',
      'Bei neuen Themes starte ich vom Shopware-Standard und überschreibe so wenig wie möglich. Jeder überschriebene Block ist ein Block, den man beim nächsten Update prüfen muss.',
    ],
    caseSlug: 'shopware-67-theme-migration',
    articleSlug: 'shopware-67-theme-migration',
    faq: [
      { q: 'Kannst Du ein bestehendes Theme anpassen?', a: 'Ja. Oft ist das sogar der bessere Weg als ein neues Theme. Ich schaue mir zuerst an, wie das Theme aufgebaut ist, und ändere dann gezielt, was nötig ist.' },
      { q: 'Übernimmst Du auch das Design?', a: 'Ich setze Designs um, die aus Figma oder von Eurer Agentur kommen, und treffe kleinere gestalterische Entscheidungen gern mit. Ein komplettes Corporate Design entwerfe ich nicht.' },
    ],
  },
  {
    slug: 'shopware-update',
    nav: 'Update & Migration',
    glyph: '↑',
    metaTitle: 'Shopware Update & Migration auf 6.7, Shopware 5 auf 6 | Sascha Ernst',
    metaDescription: 'Shopware updaten ohne Ausfall: Update auf 6.7 mit Testumgebung, Plugin- und Theme-Check, Hilfe bei Update-Fehlern und Wartungsmodus, Umstieg von Shopware 5 auf 6. Freelancer, remote im DACH-Raum.',
    title: 'Shopware updaten,', titleEm: 'ohne dass der Shop stehen bleibt.',
    lede: 'Updates auf Shopware 6.7 mit Testumgebung und Rückweg. Und wenn ein Update schon schiefgegangen ist, bringe ich Deinen Shop zurück.',
    intro: [
      'Ein Shopware-Update ist selten nur ein Klick. Plugins müssen zur neuen Version passen, Themes erweitern Templates, die es vielleicht nicht mehr gibt, und Migrationen verändern die Datenbank. Geht dabei etwas schief, hängt der Shop im Wartungsmodus oder zeigt einen 500er.',
      'Ich mache Updates deshalb nie direkt auf dem Live-System. Erst wird eine Kopie des Shops aktualisiert und geprüft, dann folgt das Live-Update mit einem frischen Backup, auf das man jederzeit zurück kann.',
    ],
    tasks: [
      'Updates innerhalb von Shopware 6, etwa von 6.5 oder 6.6 auf 6.7',
      'Prüfung aller Plugins auf Kompatibilität mit der Zielversion',
      'Abgleich des Themes mit entfernten Templates und Blöcken',
      'Update auf einer Kopie des Live-Shops, mit Backup und Rückweg',
      'Hilfe bei Update-Fehlern: Wartungsmodus, 500er, abgebrochene Migrationen',
      'Planung und Begleitung des Umstiegs von Shopware 5 auf Shopware 6',
    ],
    approach: [
      'Vor dem Update schaue ich mir an, welche Plugins und Anpassungen im Shop stecken, und lese die Upgrade-Hinweise der Zielversion. Daraus entsteht eine Liste mit allem, was angepasst werden muss, und eine ehrliche Einschätzung des Aufwands.',
      'Das Update läuft zuerst auf einer lokalen Kopie des Live-Shops. Erst wenn Listing, Produktseite, Warenkorb und Checkout dort funktionieren, geht es auf Staging und dann live.',
      'Von Shopware 5 auf 6 gibt es kein Update im eigentlichen Sinn, es ist ein Umzug in ein neues System. Die Daten lassen sich mit dem Migrationsassistenten von Shopware übertragen, Theme und Plugins werden neu gebaut. Ich helfe Dir, das realistisch zu planen.',
    ],
    caseSlug: 'shopware-67-theme-migration',
    articleSlug: 'shopware-67-theme-migration',
    faq: [
      { q: 'Wie lange dauert ein Shopware-Update?', a: 'Das hängt vor allem von Theme und Plugins ab. Ein Shop mit Standard-Theme und wenigen Plugins ist schnell aktualisiert. Stark angepasste Themes brauchen eine gründliche Prüfung. Nach einem Blick in den Code kann ich es Dir ziemlich genau sagen.' },
      { q: 'Was passiert, wenn das Update schiefgeht?', a: 'Dafür gibt es den Rückweg: Vor jedem Update entsteht ein Backup, das sich wiederherstellen lässt. Ist ein Update ohne mich schiefgegangen, schreib mir. Dann hat Vorrang, den Shop wieder online zu bringen. Die Ursache behebe ich danach.' },
      { q: 'Muss ich überhaupt updaten?', a: 'Früher oder später ja. Updates schließen Sicherheitslücken, und je länger man wartet, desto größer wird der Sprung. Regelmäßige kleine Updates sind einfacher als ein großer Versionssprung alle paar Jahre.' },
    ],
  },
  {
    slug: 'shopware-schnittstellen',
    nav: 'Schnittstellen',
    glyph: '⇄',
    metaTitle: 'Shopware Schnittstellen & API-Anbindung (Shopware 6 API, ERP) | Sascha Ernst',
    metaDescription: 'Shopware 6 über die Shopware API mit ERP, Warenwirtschaft, Fulfillment oder Print-on-Demand verbinden: Admin-API, Store-API, Webhooks, Middleware, Logging. Freelancer Sascha Ernst, remote im DACH-Raum.',
    title: 'Shopware-Schnittstellen,', titleEm: 'die man nachvollziehen kann.',
    lede: 'Shopware mit ERP, Warenwirtschaft, Fulfillment oder Print-on-Demand verbinden. Mit Token-Auth, Validierung und einem Log, in dem steht, was wirklich passiert ist.',
    intro: [
      'Eine Schnittstelle funktioniert in der Demo fast immer. Die Probleme kommen im Alltag: ein Artikel ohne EAN, ein Timeout beim Dienstleister, eine Bestellung, die zweimal übertragen wird. Ich plane Schnittstellen deshalb vom Fehlerfall her.',
      'In meiner Zeit als stellvertretende Leitung E-Commerce habe ich über 50 Kundensysteme betreut, viele davon mit Anbindungen an externe Systeme. Aktuell baue ich eine Anbindung an einen Print-on-Demand-Dienstleister.',
    ],
    tasks: [
      'Anbindungen über Admin-API und Store-API',
      'Datenabgleich mit ERP und Warenwirtschaft, etwa PlentyONE oder JTL',
      'Bestellübergabe an Fulfillment- und Print-on-Demand-Dienstleister',
      'Webhooks und ereignisbasierte Synchronisation',
      'Middleware in PHP oder Python, wenn Shopware nicht der richtige Ort ist',
      'Logging, Wiederholversuche und Benachrichtigung bei Fehlern',
    ],
    approach: [
      'Am Anfang steht die Frage, welches System wofür führend ist. Danach lege ich fest, welche Daten in welche Richtung fließen, wie oft und was bei einem Fehler passiert.',
      'Jede Übertragung bekommt eine eindeutige Referenz, damit nichts doppelt ankommt. Fehler landen nicht im Nichts, sondern in einem Log, und im Ernstfall gibt es eine Benachrichtigung.',
    ],
    caseSlug: null,
    articleSlug: null,
    current: 'Aktuell in Arbeit: ein Connector, der Print-on-Demand-Aufträge per Knopfdruck aus einer eigenen Auftragszentrale an den Dienstleister Shirtigo übergibt und Status und Versand zurückholt.',
    faq: [
      { q: 'Mit welchen Systemen hast Du schon gearbeitet?', a: 'Unter anderem mit PlentyONE, JTL, Zahlungs- und Versanddienstleistern sowie Print-on-Demand-Anbietern. Wenn ein System eine dokumentierte API hat, lässt es sich in der Regel anbinden.' },
      { q: 'Plugin oder externe Middleware?', a: 'Einfache Abgleiche gehören oft direkt in ein Plugin. Sobald mehrere Systeme beteiligt sind oder viel Last entsteht, ist eine eigene Middleware übersichtlicher. Das entscheiden wir gemeinsam.' },
    ],
  },
  {
    slug: 'shopware-wartung',
    nav: 'Wartung & Support',
    glyph: '↻',
    metaTitle: 'Shopware Wartung & Support ab 150 €/Monat, Notfall-Hilfe | Sascha Ernst',
    metaDescription: 'Shopware-Wartung und Support ab 150 € im Monat: Updates mit Testumgebung, Backups, Monitoring, Security-Checks, Shop optimieren. Feste Reaktionszeit und Notfall-Hilfe bei Ausfällen.',
    title: 'Shopware-Wartung, Support und', titleEm: 'Hilfe, wenn es brennt.',
    lede: 'Updates, Backups, Monitoring, Security-Checks und Performance für Shopware 6. Ein fester Ansprechpartner mit Reaktionszeit, auch wenn es mal brennt.',
    intro: [
      'Ein Shop ist nie fertig. Shopware veröffentlicht regelmäßig Updates, Plugins ziehen nach, und irgendwann steckt eine Sicherheitslücke in einer Abhängigkeit, von der Du noch nie gehört hast. Wartung heißt für mich, das alles im Blick zu behalten, bevor es Probleme macht.',
      'Die Wartung gibt es ab 150 € im Monat, monatlich kündbar.',
    ],
    tasks: [
      'Shopware- und Plugin-Updates, vorher auf einer Testumgebung geprüft',
      'Tägliche Backups mit getesteter Wiederherstellung',
      'Uptime- und Fehler-Monitoring',
      'Regelmäßige Sicherheits-Checks mit Composer Audit und CVE-Bewertung',
      'Shop optimieren: Ladezeiten, Caching und Indizes im Blick',
      'Festes Stundenkontingent für kleine Anpassungen und Support',
      'Feste Reaktionszeit: 4 Stunden bei Ausfall, sonst 24 Stunden, jeweils werktags',
    ],
    emergency: {
      title: 'Notfall-Hilfe',
      text: 'Update abgebrochen, Wartungsmodus hängt, 500er im Checkout: Dann zählt Zeit. Ich analysiere Logs und Stacktraces, stelle den letzten funktionierenden Stand wieder her und behebe danach in Ruhe die Ursache.',
      tasks: [
        'Wiederherstellung nach fehlgeschlagenen Updates und Migrationen',
        'Analyse von Shopware-Logs, Stacktraces, PHP-FPM- und Nginx-Fehlern',
        'Reparatur defekter DAL- und Suchindizes',
        'HTTP-Cache- und ESI-Probleme',
      ],
    },
    approach: [
      'Updates spiele ich nie direkt auf dem Live-Shop ein. Erst wird ein aktuelles Backup in eine Testumgebung geladen, dort aktualisiert und geprüft. Erst wenn Listing, Produktseite, Warenkorb und Checkout laufen, geht das Update live.',
    ],
    caseSlug: 'shopware-update-recovery',
    articleSlug: null,
    faq: [
      { q: 'Bekomme ich auch ohne Wartungsvertrag Notfall-Hilfe?', a: 'Ja, schreib mir. Ohne Vertrag kann ich keine feste Reaktionszeit zusagen, helfe aber, sobald es meine Kapazität erlaubt.' },
      { q: 'Muss ich dafür das Hosting wechseln?', a: 'Nein. Ich arbeite mit Deinem bestehenden Hosting. Wenn Du wechseln willst, helfe ich dabei.' },
    ],
  },
]

export const caseStudies = [
  {
    slug: 'landingpage-plugin',
    caseId: 'landingpage-plugin',
    service: 'shopware-plugin-entwicklung',
    metaTitle: 'Fallstudie: Shopware-Plugin für Landingpages ohne Header und Footer | Sascha Ernst',
    metaDescription: 'Eigenes Shopware-6-Plugin LandingPage Show/Hide Switch: Header und Footer pro Seite steuern, ESI-kompatibel, idempotente Installation ohne SQL-Fehler 1062, GPSR-Pflichtangaben.',
    context: 'Eigenentwicklung für einen Streetwear-Shop auf Shopware 6. Seit 2025 im Einsatz, aktuell Version 1.4.0.',
    facts: [['Rolle', 'Konzept und Entwicklung'], ['Stack', 'PHP 8.2, Symfony, DAL, Twig, Vue'], ['Status', 'produktiv, v1.4.0']],
    sections: [
      ['Ausgangslage', 'Für Kampagnen sollten Landingpages ohne den normalen Header und Footer laufen, damit Besucher beim Angebot bleiben. Diese Einstellung sollte pro Kategorie und Landingpage in der Administration wählbar sein, ohne Entwickler.'],
      ['Ursache der Probleme', 'Drei Dinge standen im Weg. Das Theme setzte feste Abstände für den fixierten Header, ohne Header blieb eine weiße Lücke von 70 bis 170 Pixeln. Die erste Version legte beim Installieren ihre Custom Fields blind an und brach bei einer Neuinstallation mit SQL-Fehler 1062 ab. Und ohne Footer fehlten Impressum, Widerrufsbelehrung und die Herstellerangaben, die seit der EU-Produktsicherheitsverordnung (GPSR) Pflicht sind.'],
      ['Lösung', 'Ein Event Subscriber auf die Navigations- und Landingpage-Events liest die Custom Fields aus und stellt sie dem Template als Extension bereit. So entscheidet die Seite selbst, ob Header und Footer eingebunden werden, und es entstehen keine überflüssigen ESI-Subrequests. Eine Body-Klasse setzt die Abstände des Themes zurück, der Selektor ist in der Plugin-Konfiguration einstellbar. Custom-Field-Sets werden vor dem Schreiben gesucht und vorhandene IDs weiterverwendet. Zwei eigene CMS-Elemente liefern einen minimalen Footer und Pop-ups für die Pflichtangaben.'],
      ['Ergebnis', 'Landingpages lassen sich pro Seite in der Administration steuern. Das Plugin installiert, aktualisiert und deinstalliert sich ohne Datenbankfehler. Pflichtangaben bleiben auch ohne Footer erreichbar.'],
    ],
  },
  {
    slug: 'shopware-67-theme-migration',
    caseId: 'theme-67',
    service: 'shopware-update',
    metaTitle: 'Fallstudie: Shopware-Theme-Migration auf 6.7 | Sascha Ernst',
    metaDescription: 'Individuelles Shopware-Theme auf 6.7 migriert: entfernte Template-Pfade umgestellt, Garagentor-Navigation und Vollbild-Suche als Storefront-JS-Plugins, responsives Listing.',
    context: 'Individuelles Storefront-Theme eines Streetwear-Shops, an dem ich technisch verantwortlich mitarbeite.',
    facts: [['Rolle', 'Theme-Entwicklung und Migration'], ['Stack', 'Twig 3, SCSS/BEM, Vanilla JS'], ['Version', 'Shopware 6.7']],
    sections: [
      ['Ausgangslage', 'Der Shop sollte auf Shopware 6.7 aktualisiert werden. Nach dem Update brach die Storefront mit Twig-Fehlern ab, obwohl am Theme nichts geändert worden war.'],
      ['Ursache', 'Shopware hat in 6.7 alte Template-Pfade entfernt. Die Kaufbox zum Beispiel lag lange unter page/product-detail/buy-widget.html.twig. Diese Datei gibt es in 6.6 noch, in 6.7 nicht mehr, der Nachfolger liegt unter component/buy-widget/. Das Child-Theme erweiterte noch die alten Dateien.'],
      ['Lösung', 'Alle Child-Templates wurden auf die neuen Pfade umgestellt und veraltete Blöcke entfernt. Im selben Zug kamen neue Funktionen dazu: ein Navigationsmenü, das wie ein Garagentor von oben herunterfährt und erst die Haupt-, dann die Unterkategorien zeigt, und eine Vollbild-Suche mit Autofokus. Beides sind Storefront-JS-Plugins, die sich mit Escape schließen lassen und den Fokus sauber führen. Das Produktlisting läuft über CSS Grid mit fünf Spalten auf großen Bildschirmen.'],
      ['Ergebnis', 'Der Shop läuft auf Shopware 6.7. Das Theme nutzt nur noch Pfade, die es in der Zielversion gibt, und das nächste Update lässt sich mit einem schnellen Abgleich prüfen.'],
    ],
    link: { href: 'https://aintlikeyouclothing.com', label: 'Shop ansehen: aintlikeyouclothing.com' },
  },
  {
    slug: 'shopware-update-recovery',
    caseId: 'recovery',
    service: 'shopware-wartung',
    metaTitle: 'Fallstudie: Shopware-Recovery nach fehlgeschlagenem Update | Sascha Ernst',
    metaDescription: 'Restore-Skript für Shopware 6: Live-Backups reproduzierbar in DDEV einspielen, Domains per SQL umsetzen, Indizes und Theme neu aufbauen. Fehler nachstellen, ohne den Live-Shop anzufassen.',
    context: 'Werkzeug aus dem Betrieb eines Shopware-6-Shops, das ich heute für Fehleranalysen und Update-Tests nutze.',
    facts: [['Rolle', 'Betrieb und Automatisierung'], ['Stack', 'Bash, SQL, DDEV, bin/console'], ['Einsatz', 'Updates, Fehleranalyse']],
    sections: [
      ['Ausgangslage', 'Shopware-Updates scheitern an inkompatiblen Plugins, abgebrochenen Composer-Läufen oder fehlerhaften Migrationen. Dann hängt der Shop im Wartungsmodus oder zeigt nur noch einen 500er. Auf dem Live-System herumzuprobieren ist in dem Moment die schlechteste Idee.'],
      ['Ursache', 'Das eigentliche Problem war, dass sich Fehler nicht schnell genug nachstellen ließen. Ein Backup lokal einzuspielen hieß jedes Mal: Dump anpassen, Domains ändern, Indizes neu aufbauen, Theme kompilieren. Von Hand dauert das und ist fehleranfällig.'],
      ['Lösung', 'Ein Restore-Skript erledigt das in einem Durchgang. Es entfernt CREATE-DATABASE- und USE-Anweisungen aus dem Dump, spielt ihn in DDEV ein, setzt die Sales-Channel-Domains per SQL auf die lokale Adresse um (UUIDs liegen binär in der Datenbank, deshalb über UNHEX) und fährt danach plugin:refresh, dal:refresh:index und theme:compile.'],
      ['Ergebnis', 'Ein Live-Backup lässt sich mit einem Befehl lokal wiederherstellen. Updates werden dort zuerst getestet, und Fehler lassen sich nachstellen und beheben, bevor am Live-Shop etwas geändert wird.'],
    ],
  },
]

const esiPhp = String.raw`&lt;?php declare(strict_types=1);

namespace LayoutSwitch\Subscriber;

use Shopware\Core\Framework\Struct\ArrayStruct;
use Shopware\Storefront\Page\LandingPage\LandingPageLoadedEvent;
use Shopware\Storefront\Page\Navigation\NavigationPageLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class LayoutSwitchSubscriber implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            NavigationPageLoadedEvent::class => 'onNavigationPage',
            LandingPageLoadedEvent::class => 'onLandingPage',
        ];
    }

    public function onNavigationPage(NavigationPageLoadedEvent $event): void
    {
        $fields = $event->getPage()->getCategory()?->getCustomFields() ?? [];
        $event->getPage()->addExtension('layoutSwitch', $this->build($fields));
    }

    public function onLandingPage(LandingPageLoadedEvent $event): void
    {
        $fields = $event->getPage()->getLandingPage()?->getCustomFields() ?? [];
        $event->getPage()->addExtension('layoutSwitch', $this->build($fields));
    }

    private function build(array $fields): ArrayStruct
    {
        return new ArrayStruct([
            'hideHeader' => (bool) ($fields['layout_switch_hide_header'] ?? false),
            'hideFooter' => (bool) ($fields['layout_switch_hide_footer'] ?? false),
        ]);
    }
}`

const esiTwig = String.raw`{% sw_extends '@Storefront/storefront/base.html.twig' %}

{% block base_body_classes %}
    {{- parent() -}}
    {% set layoutSwitch = page.extensions.layoutSwitch ?? null %}
    {%- if layoutSwitch and layoutSwitch.get('hideHeader') %} is-header-hidden{% endif -%}
{% endblock %}

{% block base_esi_header %}
    {% set layoutSwitch = page.extensions.layoutSwitch ?? null %}
    {% if not (layoutSwitch and layoutSwitch.get('hideHeader')) %}
        {{ parent() }}
    {% endif %}
{% endblock %}`

const upsertPhp = String.raw`private function installCustomFields(Context $context): void
{
    /** @var EntityRepository $setRepository */
    $setRepository = $this->container->get('custom_field_set.repository');

    $criteria = (new Criteria())
        ->addFilter(new EqualsFilter('name', 'layout_switch'))
        ->addAssociation('customFields');

    $existing = $setRepository->search($criteria, $context)->first();

    $fieldIds = [];
    foreach ($existing?->getCustomFields() ?? [] as $field) {
        $fieldIds[$field->getName()] = $field->getId();
    }

    $setRepository->upsert([[
        'id' => $existing?->getId() ?? Uuid::randomHex(),
        'name' => 'layout_switch',
        'config' => ['label' => ['de-DE' => 'Layout-Schalter', 'en-GB' => 'Layout switch']],
        // Relationen nur beim ersten Anlegen, sonst entstehen Dubletten
        'relations' => $existing ? [] : [['entityName' => 'category'], ['entityName' => 'landing_page']],
        'customFields' => [[
            'id' => $fieldIds['layout_switch_hide_header'] ?? Uuid::randomHex(),
            'name' => 'layout_switch_hide_header',
            'type' => CustomFieldTypes::BOOL,
            'config' => [
                'label' => ['de-DE' => 'Header ausblenden', 'en-GB' => 'Hide header'],
                'componentName' => 'sw-field',
                'customFieldType' => 'switch',
                'type' => 'switch',
            ],
        ]],
    ]], $context);
}`

const lifecyclePhp = String.raw`public function install(InstallContext $installContext): void
{
    $this->installCustomFields($installContext->getContext());
}

public function update(UpdateContext $updateContext): void
{
    $this->installCustomFields($updateContext->getContext());
}

public function uninstall(UninstallContext $uninstallContext): void
{
    if ($uninstallContext->keepUserData()) {
        return;
    }

    $this->removeCustomFields($uninstallContext->getContext());
}`

const findTemplatesBash = String.raw`# alle Shopware-Templates, die das Theme erweitert oder einbindet
grep -rhoE "(sw_extends|sw_include) '@Storefront/storefront/[^']+'" src/Resources/views \
  | grep -oE "storefront/[^']+" | sort -u > used-templates.txt

# welche davon gibt es in der installierten Version nicht mehr?
while read -r tpl; do
  [ -f "vendor/shopware/storefront/Resources/views/$tpl" ] || echo "fehlt: $tpl"
done &lt; used-templates.txt`

export const articles = [
  {
    slug: 'shopware-67-esi-header-footer',
    title: 'Shopware 6.7 lädt Header und Footer per ESI: Was das für eigene Layouts bedeutet',
    short: 'Header und Footer per ESI in Shopware 6.7',
    date: '2026-09-29',
    category: 'Cache & ESI',
    version: 'Shopware 6.7',
    service: 'shopware-plugin-entwicklung',
    intro: 'Mit Shopware 6.7 werden Header und Footer der Storefront als eigene ESI-Fragmente geladen. Wer Header oder Footer pro Seite ein- und ausblenden will, muss deshalb umdenken. Ich habe das bei meinem Plugin LandingPage Show/Hide Switch gelernt.',
    body: String.raw`
<h2>Was sich in 6.7 geändert hat</h2>
<p>Bis Shopware 6.6 bindet <code>base.html.twig</code> Header und Footer direkt ins Seiten-Template ein. In 6.7.0.0 stehen dort zwei neue Blöcke:</p>
<pre>{% block base_esi_header %}
    {{ render_esi(url('frontend.header', { headerParameters: headerParameters })) }}
{% endblock %}

{# … #}

{% block base_esi_footer %}
    {{ render_esi(url('frontend.footer', { footerParameters: footerParameters })) }}
{% endblock %}</pre>
<p><code>render_esi</code> kommt aus Symfony. Läuft ein Reverse Proxy mit ESI-Unterstützung, etwa der HTTP-Cache von Shopware oder Varnish, wird der Header als eigener Request geladen und getrennt gecacht. Ohne ESI-fähigen Proxy rendert Symfony das Fragment als normalen Unter-Request.</p>
<p>Für den Cache ist das gut: Der Header ist auf allen Seiten gleich und muss nur einmal berechnet werden. Für Anpassungen pro Seite heißt es aber: Innerhalb des Header-Templates weißt Du nicht mehr zuverlässig, auf welcher Kategorie oder Landingpage Du gerade bist. Das Fragment ist ein eigener Request mit eigenem Cache-Eintrag.</p>

<h2>Das Problem an einem Beispiel</h2>
<p>Für Kampagnen-Landingpages sollten Header und Footer pro Seite ausblendbar sein. Die naheliegende Lösung, im Header-Template eine Bedingung einzubauen, passt nicht mehr zu ESI. Das Header-Fragment wird für viele Seiten wiederverwendet und kennt die Einstellung der jeweiligen Seite nicht.</p>

<h2>Die Entscheidung gehört in den Haupt-Request</h2>
<p>Die Seite selbst kennt ihre Kategorie oder Landingpage. Also wird dort entschieden, ob das Fragment überhaupt eingebunden wird. Ein Event Subscriber liest die Custom Fields aus und hängt das Ergebnis als Extension an die Seite. <code>NavigationPage::getCategory()</code> und <code>LandingPage::getLandingPage()</code> gibt es beide in 6.7:</p>
<pre>${esiPhp}</pre>
<p>Im Theme wird dann der ESI-Block überschrieben. Ist der Header ausgeblendet, entsteht auch kein Unter-Request. Die Body-Klasse brauchst Du für die Abstände, dazu gleich mehr:</p>
<pre>${esiTwig}</pre>

<h2>Worauf Du achten solltest</h2>
<ul>
  <li><strong>Abstände im Theme.</strong> Viele Themes reservieren oben Platz für einen fixierten Header. Ohne Header bleibt dann eine Lücke. Mit der Body-Klasse <code>is-header-hidden</code> lässt sich das per CSS zurücksetzen.</li>
  <li><strong>Pflichtangaben.</strong> Ohne Footer fehlen die Links zu Impressum und Datenschutz. Die müssen auf der Landingpage anders erreichbar bleiben, zum Beispiel über ein eigenes CMS-Element.</li>
  <li><strong>Cache nach Änderungen.</strong> Die Entscheidung steckt jetzt im HTML der Hauptseite. Nach dem Umschalten in der Administration prüfst Du am besten, ob der Seiten-Cache wirklich erneuert wurde.</li>
  <li><strong>Blöcke überschreiben, nicht kopieren.</strong> In 6.7.0.0 nutzt der Block <code>url()</code>, im aktuellen Entwicklungszweig bereits <code>path()</code>. Wer mit <code>parent()</code> arbeitet statt den Aufruf zu kopieren, bekommt solche Änderungen automatisch mit.</li>
</ul>`,
    sources: [
      { title: 'Shopware 6.7.0.0: storefront/base.html.twig (GitHub)', href: 'https://github.com/shopware/shopware/blob/v6.7.0.0/src/Storefront/Resources/views/storefront/base.html.twig' },
      { title: 'Shopware Docs: HTTP-Cache', href: 'https://developer.shopware.com/docs/concepts/framework/http_cache.html' },
      { title: 'Symfony Docs: Working with Edge Side Includes', href: 'https://symfony.com/doc/current/http_cache/esi.html' },
    ],
  },
  {
    slug: 'shopware-custom-fields-1062-idempotent',
    title: 'SQL-Fehler 1062 beim Plugin-Update: Custom Fields in Shopware wiederholbar anlegen',
    short: 'Custom Fields ohne SQL-Fehler 1062',
    date: '2026-09-29',
    category: 'Plugins & DAL',
    version: 'Shopware 6.5 bis 6.7',
    service: 'shopware-plugin-entwicklung',
    intro: 'Ein Plugin installiert sich auf der frischen Testumgebung problemlos. Auf dem Live-Shop, nach einer Neuinstallation oder einem Update, bricht es mit SQLSTATE[23000] und Fehler 1062 ab. Die Ursache ist fast immer dieselbe: Custom Fields werden blind neu angelegt.',
    body: String.raw`
<h2>Woher der Fehler kommt</h2>
<p>Custom-Field-Sets und Custom Fields haben in Shopware einen eindeutigen technischen Namen. Legt ein Plugin sie in <code>install()</code> mit <code>create()</code> an, klappt das genau einmal. Wurde das Plugin vorher schon installiert und mit „Daten behalten“ deinstalliert, existiert das Set noch. Beim nächsten Versuch meldet MySQL einen doppelten Eintrag:</p>
<pre>SQLSTATE[23000]: Integrity constraint violation: 1062 Duplicate entry 'layout_switch' …</pre>
<p>Dasselbe passiert, wenn ein Update neue Felder ergänzen soll und dafür das ganze Set noch einmal schreibt.</p>

<h2>Erst suchen, dann upserten</h2>
<p>Statt <code>create()</code> nutze ich <code>upsert()</code> und sorge dafür, dass vorhandene Datensätze ihre ID behalten. Dafür wird das Set vorher per Criteria gesucht, zusammen mit seinen Feldern. Wichtig sind die IDs: Ohne sie legt auch <code>upsert()</code> neue Datensätze an und läuft in denselben Fehler.</p>
<pre>${upsertPhp}</pre>
<p>Die Relationen zu Kategorie und Landingpage schreibe ich nur beim ersten Anlegen. Sie haben keine eigene fachliche ID, die man wiederverwenden könnte, und würden sonst doppelt angelegt.</p>

<h2>Wohin damit im Lebenszyklus</h2>
<p>Die Methode läuft in <code>install()</code> und in <code>update()</code>. Dadurch bringt jedes Update fehlende Felder mit, ohne vorhandene zu duplizieren. In <code>uninstall()</code> wird das Set nur entfernt, wenn der Shopbetreiber keine Daten behalten will. Sonst wären die gepflegten Werte in allen Kategorien weg.</p>
<pre>${lifecyclePhp}</pre>

<h2>So teste ich das</h2>
<ol>
  <li>Installieren und aktivieren: <code>bin/console plugin:install --activate LayoutSwitch</code></li>
  <li>Deinstallieren mit Daten: <code>bin/console plugin:uninstall --keep-user-data LayoutSwitch</code></li>
  <li>Erneut installieren. Hier ist die erste Version damals gescheitert.</li>
  <li>Die vorherige Plugin-Version installieren und auf die neue aktualisieren.</li>
  <li>Ohne <code>--keep-user-data</code> deinstallieren und prüfen, dass nichts übrig bleibt.</li>
</ol>
<p>Für eigene Tabellen gilt dasselbe Prinzip. Dort sorgen Migrationen mit Anweisungen wie <code>CREATE TABLE IF NOT EXISTS</code> dafür, dass ein zweiter Lauf keinen Schaden anrichtet.</p>`,
    sources: [
      { title: 'Shopware Docs: Plugin Base Guide', href: 'https://developer.shopware.com/docs/guides/plugins/plugins/plugin-base-guide.html' },
      { title: 'Shopware Docs: Database Migrations', href: 'https://developer.shopware.com/docs/guides/plugins/plugins/plugin-fundamentals/database-migrations.html' },
    ],
  },
  {
    slug: 'shopware-67-theme-migration',
    title: 'Theme-Update auf Shopware 6.7: Wenn sw_extends ins Leere zeigt',
    short: 'Theme-Update auf Shopware 6.7',
    date: '2026-09-29',
    category: 'Storefront & Updates',
    version: 'Shopware 6.6 → 6.7',
    service: 'shopware-update',
    intro: 'Nach dem Update auf Shopware 6.7 bricht die Storefront mit einem Twig-Fehler ab, obwohl am Theme niemand etwas geändert hat. Der häufigste Grund: Das Theme erweitert ein Template, das es in 6.7 nicht mehr gibt.',
    body: String.raw`
<h2>Ein typischer Fall: das Buy-Widget</h2>
<p>Die Kaufbox auf der Produktseite lag lange unter <code>storefront/page/product-detail/buy-widget.html.twig</code>. Seit Shopware 6.5.8 gibt es parallel <code>storefront/component/buy-widget/buy-widget.html.twig</code>. In 6.6 existieren beide Dateien, in 6.7.0.0 ist der alte Pfad entfernt. Ein Child-Theme, das noch den alten Pfad erweitert, findet seine Elternvorlage nicht mehr:</p>
<pre>- {% sw_extends '@Storefront/storefront/page/product-detail/buy-widget.html.twig' %}
+ {% sw_extends '@Storefront/storefront/component/buy-widget/buy-widget.html.twig' %}</pre>
<p>Die Fehlermeldung nennt meistens den Pfad, der nicht gefunden wird. Bei einem großen Theme ist das aber nur der erste von mehreren Treffern.</p>

<h2>Alle betroffenen Stellen auf einmal finden</h2>
<p>Bevor ich ein Theme aktualisiere, suche ich alle Pfade, die die Zielversion nicht mehr kennt. Dafür gleiche ich die eigenen <code>sw_extends</code>- und <code>sw_include</code>-Aufrufe mit den Templates im Shopware-Code ab. Das läuft nach dem Composer-Update auf der Zielversion, lokal oder in einer Kopie des Shops:</p>
<pre>${findTemplatesBash}</pre>
<p>Jede Zeile mit „fehlt“ ist ein Kandidat für einen Twig-Fehler. Das Beispiel sucht nur Aufrufe in einfachen Anführungszeichen. Wenn Dein Theme auch doppelte nutzt, erweiterst Du den Ausdruck entsprechend.</p>

<h2>Blöcke prüfen, nicht nur Dateien</h2>
<p>Auch wenn eine Datei noch existiert, können Blöcke umbenannt oder entfernt worden sein. Das ist tückischer: Ein überschriebener Block, den es in der Elternvorlage nicht mehr gibt, wirft in Twig keinen Fehler. Deine Anpassung erscheint einfach nicht mehr. Deshalb lese ich vor jedem Update die Datei <code>UPGRADE-6.7.md</code> im Shopware-Repository und vergleiche jede überschriebene Stelle mit der neuen Vorlage.</p>

<h2>Die Reihenfolge, die sich bewährt hat</h2>
<ol>
  <li>Aktuelles Live-Backup lokal in DDEV einspielen.</li>
  <li>Composer-Update auf die Zielversion, danach <code>bin/console system:update:finish</code>.</li>
  <li>Pfad-Abgleich laufen lassen, fehlende Templates umstellen, Upgrade-Hinweise durchgehen.</li>
  <li><code>bin/console theme:compile</code> und <code>bin/console cache:clear</code>.</li>
  <li>Kernabläufe durchklicken: Listing, Produktseite, Warenkorb, Checkout, Suche und Navigation, auch per Tastatur.</li>
  <li>Erst dann auf Staging und zuletzt live.</li>
</ol>`,
    sources: [
      { title: 'Shopware: UPGRADE-6.7.md (GitHub)', href: 'https://github.com/shopware/shopware/blob/trunk/UPGRADE-6.7.md' },
      { title: 'Shopware Release Notes', href: 'https://developer.shopware.com/release-notes/' },
      { title: 'Shopware Docs: Theme Base Guide', href: 'https://developer.shopware.com/docs/guides/plugins/themes/theme-base-guide.html' },
    ],
  },
]
