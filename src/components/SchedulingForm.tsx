
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Clock, User, FileText, LogOut, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SchedulingFormProps {
  onLogout: () => void;
}

const SchedulingForm: React.FC<SchedulingFormProps> = ({ onLogout }) => {
  const [userId, setUserId] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userId || !dateTime || !description.trim()) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulando chamada para a API de agendamento
      const schedulingData = {
        userId: parseInt(userId),
        dateTime,
        description: description.trim()
      };
      
      console.log('Dados do agendamento:', schedulingData);
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Agendamento realizado com sucesso!",
        description: `Atendimento agendado para ${new Date(dateTime).toLocaleString('pt-BR')}`,
      });
      
      // Limpar formulário após sucesso
      setUserId('');
      setDateTime('');
      setDescription('');
      
    } catch (error) {
      toast({
        title: "Erro no agendamento",
        description: "Não foi possível agendar o atendimento. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Função para obter data mínima (agora)
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-support-primary/10 to-support-secondary/10">
      {/* Header */}
      <header className="bg-white support-shadow border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 support-gradient rounded-lg flex items-center justify-center">
              <Calendar className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Sistema de Suporte Técnico</h1>
              <p className="text-sm text-gray-600">Agendamento de Atendimento</p>
            </div>
          </div>
          <Button
            onClick={onLogout}
            variant="outline"
            className="flex items-center gap-2 hover:bg-gray-50"
          >
            <LogOut className="w-4 h-4" />
            Sair
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-8">
        <Card className="support-shadow-lg border-0 bg-white/95 backdrop-blur-sm animate-fade-in">
          <CardHeader className="text-center space-y-2 pb-6">
            <div className="mx-auto w-14 h-14 bg-support-primary/10 rounded-full flex items-center justify-center">
              <Clock className="w-7 h-7 text-support-dark" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Agendar Atendimento Técnico
            </CardTitle>
            <CardDescription className="text-gray-600">
              Preencha os dados abaixo para solicitar um atendimento técnico
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="userId" className="text-gray-700 font-medium">
                  ID do Usuário
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="userId"
                    type="number"
                    placeholder="Digite seu ID de usuário"
                    value={userId}
                    onChange={(e) => setUserId(e.target.value)}
                    className="pl-10 h-12 border-gray-200 focus:border-support-primary focus:ring-support-primary/20"
                    min="1"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Seu ID único no sistema de suporte
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="dateTime" className="text-gray-700 font-medium">
                  Data e Hora do Atendimento
                </Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="dateTime"
                    type="datetime-local"
                    value={dateTime}
                    onChange={(e) => setDateTime(e.target.value)}
                    min={getMinDateTime()}
                    className="pl-10 h-12 border-gray-200 focus:border-support-primary focus:ring-support-primary/20"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Selecione a data e horário desejados para o atendimento
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700 font-medium">
                  Descrição do Problema
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Textarea
                    id="description"
                    placeholder="Descreva detalhadamente o problema técnico que você está enfrentando..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="pl-10 pt-3 min-h-[120px] border-gray-200 focus:border-support-primary focus:ring-support-primary/20 resize-none"
                    required
                  />
                </div>
                <p className="text-xs text-gray-500">
                  Forneça o máximo de detalhes possível sobre o problema
                </p>
              </div>
              
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 support-gradient hover:opacity-90 transition-opacity text-white font-medium text-base support-shadow"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Agendando...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-5 h-5" />
                      Agendar Atendimento
                    </div>
                  )}
                </Button>
              </div>
            </form>
            
            <div className="mt-6 p-4 bg-support-primary/5 rounded-lg border border-support-primary/20">
              <div className="flex items-start gap-3">
                <div className="w-5 h-5 bg-support-primary rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-3 h-3 text-white" />
                </div>
                <div className="text-sm">
                  <p className="font-medium text-gray-900 mb-1">
                    Informações Importantes
                  </p>
                  <ul className="text-gray-600 space-y-1">
                    <li>• Agendamentos devem ser feitos com pelo menos 2 horas de antecedência</li>
                    <li>• Você receberá uma confirmação por e-mail</li>
                    <li>• Em caso de urgência, entre em contato pelo telefone (11) 9999-9999</li>
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default SchedulingForm;
