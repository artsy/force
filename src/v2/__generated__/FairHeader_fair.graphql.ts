/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FairHeader_fair = {
    readonly about: string | null;
    readonly summary: string | null;
    readonly formattedOpeningHours: string | null;
    readonly name: string | null;
    readonly slug: string;
    readonly profile: {
        readonly icon: {
            readonly _1x: {
                readonly src: string | null;
            } | null;
            readonly _2x: {
                readonly src: string | null;
            } | null;
        } | null;
    } | null;
    readonly smallHero: {
        readonly _1x: {
            readonly src: string | null;
            readonly width: number | null;
            readonly height: number | null;
        } | null;
        readonly _2x: {
            readonly src: string | null;
        } | null;
    } | null;
    readonly mediumHero: {
        readonly _1x: {
            readonly src: string | null;
            readonly width: number | null;
            readonly height: number | null;
        } | null;
        readonly _2x: {
            readonly src: string | null;
        } | null;
    } | null;
    readonly tagline: string | null;
    readonly location: {
        readonly summary: string | null;
    } | null;
    readonly ticketsLink: string | null;
    readonly hours: string | null;
    readonly links: string | null;
    readonly tickets: string | null;
    readonly contact: string | null;
    readonly " $refType": "FairHeader_fair";
};
export type FairHeader_fair$data = FairHeader_fair;
export type FairHeader_fair$key = {
    readonly " $data"?: FairHeader_fair$data;
    readonly " $fragmentRefs": FragmentRefs<"FairHeader_fair">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "summary",
  "storageKey": null
},
v1 = {
  "kind": "Literal",
  "name": "version",
  "value": "square140"
},
v2 = {
  "alias": "src",
  "args": null,
  "kind": "ScalarField",
  "name": "url",
  "storageKey": null
},
v3 = [
  (v2/*: any*/)
],
v4 = {
  "kind": "Literal",
  "name": "version",
  "value": "wide"
},
v5 = [
  (v2/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "width",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "height",
    "storageKey": null
  }
],
v6 = [
  {
    "kind": "Literal",
    "name": "format",
    "value": "HTML"
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FairHeader_fair",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "about",
      "storageKey": null
    },
    (v0/*: any*/),
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "formattedOpeningHours",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "slug",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Profile",
      "kind": "LinkedField",
      "name": "profile",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Image",
          "kind": "LinkedField",
          "name": "icon",
          "plural": false,
          "selections": [
            {
              "alias": "_1x",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 40
                },
                (v1/*: any*/),
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 40
                }
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": (v3/*: any*/),
              "storageKey": "cropped(height:40,version:\"square140\",width:40)"
            },
            {
              "alias": "_2x",
              "args": [
                {
                  "kind": "Literal",
                  "name": "height",
                  "value": 80
                },
                (v1/*: any*/),
                {
                  "kind": "Literal",
                  "name": "width",
                  "value": 80
                }
              ],
              "concreteType": "CroppedImageUrl",
              "kind": "LinkedField",
              "name": "cropped",
              "plural": false,
              "selections": (v3/*: any*/),
              "storageKey": "cropped(height:80,version:\"square140\",width:80)"
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "alias": "smallHero",
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": "_1x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 500
            },
            (v4/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 375
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v5/*: any*/),
          "storageKey": "cropped(height:500,version:\"wide\",width:375)"
        },
        {
          "alias": "_2x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1000
            },
            (v4/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 750
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": "cropped(height:1000,version:\"wide\",width:750)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": "mediumHero",
      "args": null,
      "concreteType": "Image",
      "kind": "LinkedField",
      "name": "image",
      "plural": false,
      "selections": [
        {
          "alias": "_1x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 800
            },
            (v4/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 600
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v5/*: any*/),
          "storageKey": "cropped(height:800,version:\"wide\",width:600)"
        },
        {
          "alias": "_2x",
          "args": [
            {
              "kind": "Literal",
              "name": "height",
              "value": 1600
            },
            (v4/*: any*/),
            {
              "kind": "Literal",
              "name": "width",
              "value": 1200
            }
          ],
          "concreteType": "CroppedImageUrl",
          "kind": "LinkedField",
          "name": "cropped",
          "plural": false,
          "selections": (v3/*: any*/),
          "storageKey": "cropped(height:1600,version:\"wide\",width:1200)"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "tagline",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Location",
      "kind": "LinkedField",
      "name": "location",
      "plural": false,
      "selections": [
        (v0/*: any*/)
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "ticketsLink",
      "storageKey": null
    },
    {
      "alias": null,
      "args": (v6/*: any*/),
      "kind": "ScalarField",
      "name": "hours",
      "storageKey": "hours(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v6/*: any*/),
      "kind": "ScalarField",
      "name": "links",
      "storageKey": "links(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v6/*: any*/),
      "kind": "ScalarField",
      "name": "tickets",
      "storageKey": "tickets(format:\"HTML\")"
    },
    {
      "alias": null,
      "args": (v6/*: any*/),
      "kind": "ScalarField",
      "name": "contact",
      "storageKey": "contact(format:\"HTML\")"
    }
  ],
  "type": "Fair"
};
})();
(node as any).hash = '6d4fbd90e31c7389bf7f2ea3cacb86dd';
export default node;
