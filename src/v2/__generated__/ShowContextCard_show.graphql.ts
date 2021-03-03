/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ShowContextCard_show = {
    readonly isFairBooth: boolean | null;
    readonly partner: {
        readonly internalID?: string;
        readonly slug?: string;
        readonly href?: string | null;
        readonly name?: string | null;
        readonly locations?: ReadonlyArray<{
            readonly city: string | null;
        } | null> | null;
        readonly artworksConnection?: {
            readonly edges: ReadonlyArray<{
                readonly node: {
                    readonly image: {
                        readonly url: string | null;
                    } | null;
                } | null;
            } | null> | null;
        } | null;
    } | null;
    readonly fair: {
        readonly internalID: string;
        readonly isActive: boolean | null;
        readonly slug: string;
        readonly href: string | null;
        readonly name: string | null;
        readonly " $fragmentRefs": FragmentRefs<"FairTiming_fair" | "FairCard_fair">;
    } | null;
    readonly " $refType": "ShowContextCard_show";
};
export type ShowContextCard_show$data = ShowContextCard_show;
export type ShowContextCard_show$key = {
    readonly " $data"?: ShowContextCard_show$data;
    readonly " $fragmentRefs": FragmentRefs<"ShowContextCard_show">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "internalID",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "slug",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "href",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ShowContextCard_show",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "isFairBooth",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": null,
      "kind": "LinkedField",
      "name": "partner",
      "plural": false,
      "selections": [
        {
          "kind": "InlineFragment",
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            (v2/*: any*/),
            (v3/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Location",
              "kind": "LinkedField",
              "name": "locations",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "city",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": [
                {
                  "kind": "Literal",
                  "name": "first",
                  "value": 3
                },
                {
                  "kind": "Literal",
                  "name": "sort",
                  "value": "MERCHANDISABILITY_DESC"
                }
              ],
              "concreteType": "ArtworkConnection",
              "kind": "LinkedField",
              "name": "artworksConnection",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "concreteType": "ArtworkEdge",
                  "kind": "LinkedField",
                  "name": "edges",
                  "plural": true,
                  "selections": [
                    {
                      "alias": null,
                      "args": null,
                      "concreteType": "Artwork",
                      "kind": "LinkedField",
                      "name": "node",
                      "plural": false,
                      "selections": [
                        {
                          "alias": null,
                          "args": null,
                          "concreteType": "Image",
                          "kind": "LinkedField",
                          "name": "image",
                          "plural": false,
                          "selections": [
                            {
                              "alias": null,
                              "args": [
                                {
                                  "kind": "Literal",
                                  "name": "version",
                                  "value": "larger"
                                }
                              ],
                              "kind": "ScalarField",
                              "name": "url",
                              "storageKey": "url(version:\"larger\")"
                            }
                          ],
                          "storageKey": null
                        }
                      ],
                      "storageKey": null
                    }
                  ],
                  "storageKey": null
                }
              ],
              "storageKey": "artworksConnection(first:3,sort:\"MERCHANDISABILITY_DESC\")"
            }
          ],
          "type": "Partner"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Fair",
      "kind": "LinkedField",
      "name": "fair",
      "plural": false,
      "selections": [
        (v0/*: any*/),
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "isActive",
          "storageKey": null
        },
        (v1/*: any*/),
        (v2/*: any*/),
        (v3/*: any*/),
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FairTiming_fair"
        },
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "FairCard_fair"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Show"
};
})();
(node as any).hash = '6ac05f1e4151a1c743f8bc935deedc7b';
export default node;
