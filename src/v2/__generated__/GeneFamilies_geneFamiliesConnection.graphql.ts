/* tslint:disable */
/* eslint-disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneFamilies_geneFamiliesConnection = {
    readonly edges: ReadonlyArray<{
        readonly node: {
            readonly id: string;
            readonly slug: string;
            readonly name: string;
            readonly genes: ReadonlyArray<{
                readonly id: string;
                readonly slug: string;
                readonly name: string | null;
                readonly displayName: string | null;
                readonly isPublished: boolean | null;
            } | null> | null;
            readonly featuredGeneLinks: ReadonlyArray<{
                readonly href: string;
                readonly title: string;
                readonly image: {
                    readonly url: string | null;
                } | null;
            } | null> | null;
        } | null;
    } | null> | null;
    readonly " $refType": "GeneFamilies_geneFamiliesConnection";
};
export type GeneFamilies_geneFamiliesConnection$data = GeneFamilies_geneFamiliesConnection;
export type GeneFamilies_geneFamiliesConnection$key = {
    readonly " $data"?: GeneFamilies_geneFamiliesConnection$data;
    readonly " $fragmentRefs": FragmentRefs<"GeneFamilies_geneFamiliesConnection">;
};



const node: ReaderFragment = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
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
  "name": "name",
  "storageKey": null
};
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "GeneFamilies_geneFamiliesConnection",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "GeneFamilyEdge",
      "kind": "LinkedField",
      "name": "edges",
      "plural": true,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "GeneFamily",
          "kind": "LinkedField",
          "name": "node",
          "plural": false,
          "selections": [
            (v0/*: any*/),
            (v1/*: any*/),
            (v2/*: any*/),
            {
              "alias": null,
              "args": null,
              "concreteType": "Gene",
              "kind": "LinkedField",
              "name": "genes",
              "plural": true,
              "selections": [
                (v0/*: any*/),
                (v1/*: any*/),
                (v2/*: any*/),
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "displayName",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "isPublished",
                  "storageKey": null
                }
              ],
              "storageKey": null
            },
            {
              "alias": null,
              "args": null,
              "concreteType": "FeaturedGeneLink",
              "kind": "LinkedField",
              "name": "featuredGeneLinks",
              "plural": true,
              "selections": [
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "href",
                  "storageKey": null
                },
                {
                  "alias": null,
                  "args": null,
                  "kind": "ScalarField",
                  "name": "title",
                  "storageKey": null
                },
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
                          "value": "large_rectangle"
                        }
                      ],
                      "kind": "ScalarField",
                      "name": "url",
                      "storageKey": "url(version:\"large_rectangle\")"
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
      "storageKey": null
    }
  ],
  "type": "GeneFamilyConnection"
};
})();
(node as any).hash = '2cc2d8986cbd69684fa0ec598648831a';
export default node;
