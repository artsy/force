/**
 * @generated SignedSource<<b8a9c60dcc83e5ba56dc421b9e06406e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ShowContextCard_show$data = {
  readonly fair: {
    readonly href: string | null | undefined;
    readonly internalID: string;
    readonly isActive: boolean | null | undefined;
    readonly name: string | null | undefined;
    readonly slug: string;
    readonly " $fragmentSpreads": FragmentRefs<"FairCard_fair" | "FairTiming_fair">;
  } | null | undefined;
  readonly isFairBooth: boolean | null | undefined;
  readonly partner: {
    readonly artworksConnection?: {
      readonly edges: ReadonlyArray<{
        readonly node: {
          readonly image: {
            readonly url: string | null | undefined;
          } | null | undefined;
        } | null | undefined;
      } | null | undefined> | null | undefined;
    } | null | undefined;
    readonly href?: string | null | undefined;
    readonly internalID?: string;
    readonly locations?: ReadonlyArray<{
      readonly city: string | null | undefined;
    } | null | undefined> | null | undefined;
    readonly name?: string | null | undefined;
    readonly slug?: string;
  } | null | undefined;
  readonly " $fragmentType": "ShowContextCard_show";
};
export type ShowContextCard_show$key = {
  readonly " $data"?: ShowContextCard_show$data;
  readonly " $fragmentSpreads": FragmentRefs<"ShowContextCard_show">;
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
          "type": "Partner",
          "abstractKey": null
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
  "type": "Show",
  "abstractKey": null
};
})();

(node as any).hash = "6ac05f1e4151a1c743f8bc935deedc7b";

export default node;
