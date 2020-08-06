/* tslint:disable */

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FeatureMeta_feature = {
    readonly slug: string;
    readonly meta: {
        readonly name: string;
        readonly description: string;
        readonly image: string | null;
    };
    readonly " $refType": "FeatureMeta_feature";
};
export type FeatureMeta_feature$data = FeatureMeta_feature;
export type FeatureMeta_feature$key = {
    readonly " $data"?: FeatureMeta_feature$data;
    readonly " $fragmentRefs": FragmentRefs<"FeatureMeta_feature">;
};



const node: ReaderFragment = {
  "kind": "Fragment",
  "name": "FeatureMeta_feature",
  "type": "Feature",
  "metadata": null,
  "argumentDefinitions": [],
  "selections": [
    {
      "kind": "ScalarField",
      "alias": null,
      "name": "slug",
      "args": null,
      "storageKey": null
    },
    {
      "kind": "LinkedField",
      "alias": null,
      "name": "meta",
      "storageKey": null,
      "args": null,
      "concreteType": "FeatureMeta",
      "plural": false,
      "selections": [
        {
          "kind": "ScalarField",
          "alias": null,
          "name": "name",
          "args": null,
          "storageKey": null
        },
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
          "name": "image",
          "args": null,
          "storageKey": null
        }
      ]
    }
  ]
};
(node as any).hash = 'bea3dc26975fdc2c539c9faefaa78e6f';
export default node;
