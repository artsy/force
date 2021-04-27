/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type Shows_partner = {
    readonly featured: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly isFeatured: boolean | null;
                readonly " $fragmentRefs": FragmentRefs<"ShowBanner_show">;
            } | null;
        } | null> | null;
    } | null;
    readonly slug: string;
    readonly showsConnection: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly internalID: string;
                readonly " $fragmentRefs": FragmentRefs<"ShowCard_show">;
            } | null;
        } | null> | null;
    } | null;
    readonly " $refType": "Shows_partner";
};
export type Shows_partner$data = Shows_partner;
export type Shows_partner$key = {
    readonly " $data"?: Shows_partner$data;
    readonly " $fragmentRefs": FragmentRefs<"Shows_partner">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [
    {
      "defaultValue": 18,
      "kind": "LocalArgument",
      "name": "first",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "last",
      "type": "Int"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "after",
      "type": "String"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "before",
      "type": "String"
    },
    {
      "defaultValue": null,
      "kind": "LocalArgument",
      "name": "featuredShowStatus",
      "type": "EventStatus"
    }
  ],
  "kind": "Fragment",
  "metadata": null,
  "name": "Shows_partner",
  "selections": [
    {
      "alias": "featured",
      "args": [
        {
          "kind": "Literal",
          "name": "first",
          "value": 1
        },
        {
          "kind": "Literal",
          "name": "isDisplayable",
          "value": true
        },
        {
          "kind": "Literal",
          "name": "sort",
          "value": "FEATURED_DESC_END_AT_DESC"
        },
        {
          "kind": "Variable",
          "name": "status",
          "variableName": "featuredShowStatus"
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ShowEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Show",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isFeatured",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ShowBanner_show"
                }
              ],
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
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
      "args": [
        {
          "kind": "Variable",
          "name": "after",
          "variableName": "after"
        },
        {
          "kind": "Variable",
          "name": "before",
          "variableName": "before"
        },
        {
          "kind": "Variable",
          "name": "first",
          "variableName": "first"
        },
        {
          "kind": "Variable",
          "name": "last",
          "variableName": "last"
        }
      ],
      "concreteType": "ShowConnection",
      "kind": "LinkedField",
      "name": "showsConnection",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "ShowEdge",
          "kind": "LinkedField",
          "name": "edges",
          "plural": true,
          "selections": [
            {
              "alias": null,
              "args": null,
              "concreteType": "Show",
              "kind": "LinkedField",
              "name": "node",
              "plural": false,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "internalID",
                  "storageKey": null
                },
                {
                  "args": null,
                  "kind": "FragmentSpread",
                  "name": "ShowCard_show"
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
  "type": "Partner"
};
(node as any).hash = 'f1537ee45fdc519bbd15ce98ba71f75d';
export default node;
