/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type GeneToolTip_gene = {
    readonly description: string | null;
    readonly href: string | null;
    readonly slug: string;
    readonly internalID: string;
    readonly image: {
        readonly url: string | null;
    } | null;
    readonly name: string | null;
    readonly " $refType": "GeneToolTip_gene";
};
export type GeneToolTip_gene$data = GeneToolTip_gene;
export type GeneToolTip_gene$key = {
    readonly " $data"?: GeneToolTip_gene$data;
    readonly " $fragmentRefs": FragmentRefs<"GeneToolTip_gene">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "GeneToolTip_gene",
  "type": "Gene",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "description",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "href",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "internalID",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "image",
      "storageKey": null,
      "args": null,
      "concreteType": "Image",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "url",
          "args": [
            {
              "kind": "Literal",
              "name": "version",
              "value": "tall"
            }
          ],
          "storageKey": "url(version:\"tall\")"
        }
      ]
    },
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "name",
      "args": null,
      "storageKey": null
    }
  ]
};
(node as any).hash = 'ab5f28661f9c5437186bbdaa00ac1414';
export default node;
