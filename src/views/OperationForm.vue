<template>
  <BaseDrawer show @close="$router.go(-1)">
    <form v-if="operation.id" class="operation-form">
      <div class="operation-form__content">
        <h1 class="operation-form__title">Добавление операции</h1>

        <OperationFieldDescription :field="field" />

        <Datepicker :locale="ruLocale" />

        <div class="operation-form__value">
          <BaseSelect
            v-model="operation.type"
            label="Операция"
            :options="options"
          />
        </div>

        <div class="operation-form__date-area">
          <BaseInput
            label="Дата проведения"
            placeholder="Задайте"
            use-calendar
            :model-value="operationDate"
            @update:modelValue="onChangeDate"
          />

          <BaseInput
            v-model="operation.area"
            label="Кол-во га к обработке"
            placeholder="Задайте"
          />
        </div>

        <div class="operation-form__comment">
          <BaseTextarea
            v-model="operation.comment"
            placeholder="Комментарий к операции ..."
          />
        </div>

        <OperationQualitySwitcher
          v-model="operation.assessment"
          class="operation-form__switcher"
          :quality-list="qualityLists"
        />
      </div>

      <BaseButton
        theme="green"
        class="operation-form__submit"
        type="button"
        @click="onAddOrUpdateOperation"
      >
        {{ $route.params.id ? 'Изменить опреацию' : 'добавить операцию' }}
      </BaseButton>
    </form>
  </BaseDrawer>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import {
  Assessment,
  OperationCompletedType,
  OperationType,
} from '@/types/api/Operation';

import { Field, QualityItem } from '@/types/operation';
import { OptionsList } from '@/types';
import { ActionTypes } from '@/store/operation/actions';
import { TDate } from '@/classes/models/TDate';
import { Operation } from '@/classes/models/Operation';

import { enumKeys } from '@/helpers';
import { fieldService } from '@/api';
import { locale } from '@/locales/ru';
import { useStore } from '@/store';

import BaseButton from '@/components/base/BaseButton.vue';
import BaseDrawer from '@/components/base/BaseDrawer.vue';
import BaseTextarea from '@/components/base/BaseTextarea.vue';
import BaseInput from '@/components/base/BaseInput.vue';
import BaseSelect from '@/components/base/BaseSelect.vue';

import OperationFieldDescription from '@/components/operation-form/OperationFieldDescription.vue';
import OperationQualitySwitcher from '@/components/operation-form/OperationQualitySwitcher.vue';

import Datepicker from 'vue3-datepicker';

import ruLocale from 'date-fns/locale/ru';

const field: Field = {
  fieldId: 112,
  subtitle: 'Победа 50',
  image: '/example.png',
  crop: 'Пшеница озимая',
};

const qualityLists: Array<QualityItem> = [
  {
    name: locale[Assessment[Assessment.EXCELLENT]],
    assessment: Assessment.EXCELLENT,
  },
  {
    name: locale[Assessment[Assessment.SATISFACTORILY]],
    assessment: Assessment.SATISFACTORILY,
  },
  {
    name: locale[Assessment[Assessment.BADLY]],
    assessment: Assessment.BADLY,
  },
];

const createOperation = () => {
  return new Operation({
    id: `id_${Math.random()}`,
    type: OperationType.PLOWING,
    date: new TDate({ year: 2021, month: 3, day: 4 }),
    area: 10,
    comment: 'test',
    assessment: Assessment.EXCELLENT,
    completed: OperationCompletedType.COMPLETED,
  });
};

export default defineComponent({
  name: 'OperationForm',
  components: {
    BaseButton,
    BaseDrawer,
    BaseTextarea,
    BaseInput,
    BaseSelect,
    OperationFieldDescription,
    OperationQualitySwitcher,
    Datepicker,
  },
  setup() {
    const route = useRoute();
    const router = useRouter();
    const operation = ref({} as Operation);

    const { dispatch } = useStore();

    const options = computed(() => {
      const res = [] as OptionsList;

      for (const value of enumKeys(OperationType)) {
        res.push({
          label: locale[value],
          value: OperationType[value],
        });
      }

      return res;
    });

    const operationDate = computed(() => {
      return `${operation.value.date.day}.${operation.value.date.month}.${operation.value.date.year}`;
    });

    onMounted(async () => {
      const { id } = route.params;

      if (!id) {
        operation.value = createOperation();
        return;
      }

      const res = await fieldService.getOperation(id as string);

      operation.value = res || createOperation();
    });

    const onAddOrUpdateOperation = async () => {
      await dispatch(ActionTypes.ADD_OR_UPDATE_OPERATION, operation.value);
      router.push('/');
    };

    const onChangeDate = (val: string) => {
      const pieces = val.split('.');

      if (!pieces.length) {
        return;
      }

      operation.value.date = new TDate({
        year: +pieces[2],
        day: +pieces[0],
        month: +pieces[1],
      });
    };

    return {
      field,
      qualityLists,
      operation,
      options,
      operationDate,

      onAddOrUpdateOperation,
      onChangeDate,
      ruLocale,
    };
  },
});
</script>

<style scoped lang="scss">
.operation-form {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 12px 0 0;

  &__title {
    @include padding-form-lr;

    margin-bottom: 14px;
    font-size: $font-size-6;
    font-weight: $font-bold;
  }

  &__value {
    @include padding-form-lr;

    margin-top: 16px;
  }

  &__date-area {
    @include padding-form-lr;

    display: flex;
    margin-top: 12px;
  }

  &__comment {
    @include padding-form-lr;

    padding-top: 14px;
    margin-top: 16px;
    border-top: 1px solid $color-grey-2;

    textarea {
      height: 100px;
    }
  }

  &__switcher {
    margin-top: 50px;
  }

  &__submit {
    height: 60px;
    margin-top: auto;
  }
}
</style>
